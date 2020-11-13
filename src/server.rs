

pub mod wallpaper {
    use warp::Filter;
    use std::collections::HashMap;
    use std::convert::Infallible;
    use diesel::pg::PgConnection; 
    use diesel::prelude::*;
    use crate::models::Wallpaper as Wallpaper;
    use crate::db;
    use crate::schema::wallpapers;
    use serde_derive::{Deserialize, Serialize};
    use uuid::Uuid;
    use dotenv::dotenv;
    use std::env;
    use std::fs;
    use std::process::Command;
    use crate::models::Theme;
    extern crate serde;
    extern crate serde_json;
    use base64::{encode, decode};

    
    #[derive(Deserialize, Serialize)]
    pub struct WallpaperRequest {
        name: String,
        tags: Vec<String>,
        data: String
    }

    pub async fn get(query_params: Option<HashMap<String, String>>) -> Result<impl warp::Reply, Infallible> {
        let extra_queries = match query_params {
            Some(queries) => {
                queries.get("name");
                queries.get("tags");
                queries.get("page");
                ""
            },
            None => "",
        };

        Ok("yeet")
    }

    pub async fn put(request: WallpaperRequest) -> Result<impl warp::Reply, Infallible> {
        println!("Handling PUT request for wallpaper named {}", request.name);

        use crate::schema::themes;
        use crate::db;
        use diesel::prelude::*;
        use sha2::{Sha256, Digest};

        dotenv().ok();
        let connection = db::establish_connection();

        let base_directory = match env::var("STORAGE_PATH") {
            Ok(val) => val,
            Err(e) => "./".to_string(),
        };
        // TODO: Error handling?
        let image_bytes = base64::decode(request.data).unwrap();
        let mut hasher = Sha256::new();
        hasher.update(&image_bytes);
        let hash = base64::encode(hasher.finalize());
        let image = image::load_from_memory(&image_bytes).unwrap();
        let preview_image = image.thumbnail_exact(640, 360);
        let store_uuid = Uuid::new_v4().to_simple().to_string();

        let full_imagea = format!("{}/full_image.png", store_uuid);
        let previewa = format!("{}/preview.png", store_uuid);

        fs::create_dir(format!("{}/{}", base_directory, store_uuid));
        image.save(format!("{}/{}", base_directory, full_imagea));
        preview_image.save(format!("{}/{}", base_directory, previewa));

        let output = Command::new("gen_themes")
            .arg(&request.name)
            .arg(&full_imagea)
            .output()
            .expect("failed to generate theme");
        let stdout = std::str::from_utf8(&output.stdout).unwrap().to_string();
    
        let theme_array: Vec<Theme> = serde_json::from_str(&stdout).unwrap();

        let mut theme_ids: Vec<i32> = Vec::new();
        
        for theme_object in theme_array {
            let temp = diesel::insert_into(themes::table)
                .values(&theme_object)
                .returning(themes::id)
                .get_result::<i32>(&connection)
                .expect("Error bulk inserting themes");
            theme_ids.push(temp);
        }
        use crate::schema::wallpapers::dsl::*;
        let db_result: Wallpaper = diesel::insert_into(wallpapers)
            .values((
                name.eq(request.name), 
                preview.eq(previewa), 
                full_image.eq(full_imagea), 
                tags.eq(Some(request.tags)), 
                themes.eq(Some(theme_ids)),
                datahash.eq(hash)
            ))
            .get_result(&connection)
            .expect("Error saving new wallpaper");
        
        //Ok(format!("{}", db_result))
        Ok("")
    }

    pub async fn post(id: i32, data: WallpaperRequest) -> Result<impl warp::Reply, Infallible> {

        Ok("yeet")
    }

    pub async fn get_by_id(id: i32) -> Result<impl warp::Reply, Infallible> {
        use crate::schema::wallpapers::dsl::*;
        let connection = db::establish_connection();

        let wallpaper: Wallpaper = wallpapers.find(id).first(&connection).expect("Nothing");

        Ok(serde_json::to_string(&wallpaper).unwrap())
    }

    pub async fn delete_by_id(id: i32) -> Result<impl warp::Reply, Infallible> {
        use crate::schema::wallpapers::dsl::*;
        let connection = db::establish_connection();

        diesel::delete(wallpapers.find(&id)).execute(&connection).expect("Heck");
        Ok(format!("deleted {:?}", id))
    }
}


pub mod theme {
    use warp::Filter;
    use std::convert::Infallible;

    pub async fn get(id: i32) -> Result<impl warp::Reply, Infallible> {

        Ok("yeet")
    }
}

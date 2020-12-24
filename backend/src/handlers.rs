

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
    pub struct WallpaperPut {
        name: String,
        tags: Vec<String>,
        data: String
    }

    #[derive(Deserialize, Serialize)]
    pub struct WallpaperGet {
        name: Option<String>,
        tags: Option<Vec<String>>,
        page: Option<i32>
    }

    pub async fn get(query_params: HashMap<String,String>) -> Result<impl warp::Reply, Infallible> {
        use crate::schema::wallpapers::dsl::*;
        let connection = db::establish_connection();
        let mut response: Vec<Wallpaper> = Vec::new();
        let mut query = wallpapers.into_boxed();

        let query_size: i64 = 25;

        let max_pages: i64 = db::get_wallpaper_max() / query_size;
        
        //if query_params.is_some() {
            let temp = query_params;
            let params = WallpaperGet {
                name: match temp.get("name") {
                    Some(val) => Some(val.clone()),
                    None => None
                },
                tags: match temp.get("tags") {
                   Some(val) => Some(val.clone()
                        .split(',')
                        .map(|s| s.to_string())
                        .collect()
                    ),
                    None => None
                },
                page: match temp.get("page") {
                    Some(val) => Some(val.clone().parse::<i32>().expect("Failed to parse page number")),
                    None => None
                }
            };

            if params.name.is_some() {
                query = query.filter(name.eq(params.name.unwrap()));
            }
            
            if params.tags.is_some() {
                let tag_list = params.tags.unwrap();
                query = query.filter(tags.overlaps_with(tag_list));
            }
            if params.page.is_some() {
                let page: i64 = params.page.unwrap().into();
                query = query.offset(page * query_size);
            }
       // }

        let result: Vec<Wallpaper> = query.order(name.desc())
                                        .limit(query_size.into())
                                        .load(&connection)
                                        .unwrap();

        Ok(serde_json::to_string(&result).unwrap())
    }

    pub async fn put(request: WallpaperPut) -> Result<impl warp::Reply, Infallible> {
        println!("Handling PUT request for wallpaper named {}", &request.name);

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
        let image_bytes = base64::decode(request.data).expect("failed to decode base64");
        let mut hasher = Sha256::new();
        hasher.update(&image_bytes);
        let hash = base64::encode(hasher.finalize());
        let image = image::load_from_memory(&image_bytes).expect("failed to load image");
        let preview_image = image.thumbnail_exact(640, 360);
        let store_uuid = Uuid::new_v4().to_simple().to_string();

        let full_image_path = format!("{}/full_image.png", store_uuid);
        let preview_path = format!("{}/preview.png", store_uuid);

        fs::create_dir(format!("{}/{}", &base_directory, &store_uuid));
        image.save(format!("{}/{}", &base_directory, &full_image_path));
        preview_image.save(format!("{}/{}", &base_directory, &preview_path));
        println!("Running 'gen_themes `{}` `{}`'", &request.name, format!("{}/{}", &base_directory, &full_image_path));
        let output = Command::new("/usr/local/bin/gen_themes")
            .arg(&request.name)
            .arg(format!("{}/{}", &base_directory, &full_image_path))
            .output()
            .expect("failed to generate theme");
        let stdout = std::str::from_utf8(&output.stdout).expect("Failed to parse").to_string();
        println!("{}", &stdout);
        let theme_array: Vec<Theme> = serde_json::from_str(&stdout).expect("failed to read theme array");
        let mut wallpaper_name = request.name.clone();
        let mut wallpaper_tags = request.tags.clone();
        wallpaper_tags.push(wallpaper_name);
        
        let theme_ids: Vec<i32> = db::insert_themes(theme_array)
            .expect("Failed to insert themes");

        use crate::schema::wallpapers::dsl::*;
        let db_result: Wallpaper = diesel::insert_into(wallpapers)
            .values((
                name.eq(request.name), 
                preview.eq(format!("/image/{}", preview_path)), 
                full_image.eq(format!("/image/{}", full_image_path)), 
                tags.eq(wallpaper_tags), 
                themes.eq(Some(theme_ids)),
                datahash.eq(hash)
            ))
            .get_result(&connection)
            .expect("Error saving new wallpaper");
        
        Ok(serde_json::to_string(&db_result).expect("failed to unpack list"))
    }

    pub async fn get_by_id(id: i32) -> Result<impl warp::Reply, Infallible> {
        use crate::schema::wallpapers::dsl::*;
        let connection = db::establish_connection();

        let wallpaper: Wallpaper = wallpapers.find(id).first(&connection).expect("Failed to get id");

        Ok(serde_json::to_string(&wallpaper).unwrap())
    }

    pub async fn delete_by_id(id: i32) -> Result<impl warp::Reply, Infallible> {
        use crate::schema::wallpapers::dsl::*;
        let connection = db::establish_connection();

        diesel::delete(wallpapers.find(&id)).execute(&connection).expect("Failed to delete");
        Ok(format!("deleted {:?}", id))
    }

    pub async fn post_by_id(id: i32, data: Wallpaper ) -> Result<impl warp::Reply, Infallible> { 
        let temp = db::upsert_wallpaper(data).expect("Couldn't add wallpaper");
        Ok(format!("update theme {}", id)) 
    }
}


pub mod theme {
    use warp::Filter;
    use std::convert::Infallible;
    use diesel::prelude::*;
    use serde_derive::{Deserialize, Serialize};
    use super::super::db;
    use super::super::models::Theme;
    
    #[derive(Deserialize, Serialize)]
    pub struct ThemeRequest {
        name: String,
        foreground: String,
        background: String,
        cursor: String,
        colors: Vec<String>,  
    }

    
    #[derive(Deserialize, Serialize)]
    pub struct ThemesRequest {
        ids: Vec<i32>
    }

    pub async fn get(id: i32) -> Result<impl warp::Reply, Infallible> {
        let result = db::get_theme(id).expect("failed to get theme");
        Ok(serde_json::to_string(&result).unwrap())
    }

    pub async fn get_multiple(req: ThemesRequest) -> Result<impl warp::Reply, Infallible> {
        let mut themes: Vec<Theme> = Vec::new();
        for id in req.ids {
           themes.push(db::get_theme(id).expect("failed to get theme"));
        }

        Ok(serde_json::to_string(&themes).unwrap())
    }

    pub async fn post(id: i32, data: Theme) -> Result<impl warp::Reply, Infallible> {
        let temp = db::upsert_theme(data).expect("Couldn't add theme");
        Ok(format!("update theme {}", temp))
    }

    pub async fn delete(id: i32) -> Result<impl warp::Reply, Infallible> {
        use crate::schema::themes::dsl::*;
        let connection = db::establish_connection();

        diesel::delete(themes.find(&id)).execute(&connection).expect("Failed to delete");
        Ok(format!("deleted {:?}", id))
    }
}

pub mod template {
    use warp::Filter;
    use std::convert::Infallible;
    use serde_derive::{Deserialize, Serialize};
    use std::collections::HashMap;
    use super::super::db;
    use super::super::models::Theme;
    use tera::{ Tera, Context };

    #[derive(Deserialize, Serialize)]
    pub struct TemplateRequest {
        theme_id: i32,
        files: HashMap<String, String>,
    }
    #[derive(Deserialize, Serialize)]
    pub struct TemplateResponse {
        files: HashMap<String, String>,
    }



    pub async fn post(data: TemplateRequest) -> Result<impl warp::Reply, Infallible> {
        let mut files: HashMap<String, String> = HashMap::new();
        let mut response = TemplateResponse { files: files };
        let theme: Theme = db::get_theme(data.theme_id).expect("Bad theme id");
        let mut context = Context::new();
        context.insert("theme", &theme);

        for (filename, file) in data.files.into_iter() {
            let result = Tera::one_off(&file, &context, true)
                .expect(&format!("failed to template {}", filename));
            response.files.insert(filename, result.clone());
        }

        Ok(serde_json::to_string(&response).unwrap())
    }
}


pub mod wallpaper {
    use warp::Filter;
    use std::collections::HashMap;
    use std::convert::Infallible;
    use diesel::pg::PgConnection; 
    use diesel::prelude::*;
    use crate::models::{
        Wallpaper as Wallpaper,
        WallpaperRequest as WallpaperRequest
    };
    use crate::db;
    use crate::schema::wallpapers;
    use serde_derive::{Deserialize, Serialize};

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

    pub async fn put(data: WallpaperRequest) -> Result<impl warp::Reply, Infallible> {
        println!("Handling PUT request for wallpaper named {}", data.get_name());
        let connection = db::establish_connection();
        let new_wallpaper = Wallpaper::new(data);

        let db_result: i32 = diesel::insert_into(wallpapers::table)
            .values(&new_wallpaper)
            .returning(wallpapers::id)
            .get_result(&connection)
            .expect("Error saving new wallpaper");
        
        Ok(format!("{}", db_result))
    }

    pub async fn post(id: i32, data: WallpaperRequest) -> Result<impl warp::Reply, Infallible> {

        Ok("yeet")
    }
}

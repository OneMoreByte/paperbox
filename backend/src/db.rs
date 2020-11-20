extern crate diesel;


use diesel::prelude::*;
use diesel::pg::PgConnection;
use dotenv::dotenv;
use std::env;

use super::models::{
   Theme,
   Wallpaper
};

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url))
}

pub fn insert_themes(theme_array: Vec<Theme>) -> Result<Vec<i32>, String> {
    let mut ids = Vec::new();

    for theme_object in theme_array {
        let temp = insert_theme(theme_object);

        match temp {
            Ok(val) => ids.push(val),
            Err(e) => return Err(e)
        }
    }

    Ok(ids)
}

pub fn insert_theme(theme: Theme) -> Result<i32, String> {
    use crate::schema::themes::dsl::*;
    
    let connection = establish_connection();

    let temp = diesel::insert_into(themes)
    .values((
        name.eq(&theme.name),
        foreground.eq(&theme.foreground),
        background.eq(&theme.background),
        cursor.eq(&theme.cursor),
        colors.eq(&theme.colors)    
    ))
    .returning(id)
    .get_result::<i32>(&connection);

    match temp {
        Ok(val) => return Ok(val),
        Err(e) => return Err(format!("Failed to add {}", theme.name()))
   }
}

pub fn insert_wallpaper(wallpaper: Wallpaper) -> Result<i32, String> {
    use crate::schema::wallpapers;
    
    let connection = establish_connection();

    let temp = diesel::insert_into(wallpapers::table)
    .values(&wallpaper)
    .returning(wallpapers::id)
    .get_result::<i32>(&connection);

    match temp {
        Ok(val) => return Ok(val),
        Err(e) => return Err(format!("Failed to add {}", wallpaper.name()))
   }
}

pub fn upsert_theme(theme: Theme) -> Result<i32, String> {
    use crate::schema::themes;
    
    let connection = establish_connection();

    let temp = diesel::insert_into(themes::table)
    .values(&theme)
    .returning(themes::id)
    .get_result::<i32>(&connection);

    match temp {
        Ok(val) => return Ok(val),
        Err(e) => return Err(format!("Failed to add {}", theme.name()))
   }
}

pub fn upsert_wallpaper(wallpaper: Wallpaper) -> Result<i32, String> {
    use crate::schema::wallpapers;
    
    let connection = establish_connection();

    let temp = diesel::insert_into(wallpapers::table)
    .values(&wallpaper)
    .returning(wallpapers::id)
    .get_result::<i32>(&connection);

    match temp {
        Ok(val) => return Ok(val),
        Err(e) => return Err(format!("Failed to add {}", wallpaper.name()))
   }
}

pub fn get_theme(theme_id: i32) -> Result<Theme, String> {
    use crate::schema::themes::dsl::*;
    let connection = establish_connection();

    let result = themes.find(theme_id).first(&connection);
    match result {
        Ok(val) => return Ok(val),
        Err(e) => return Err(format!("Failed to get theme with id: {}", theme_id))
    }
}

pub fn get_wallpaper_max() -> i64 {
    use crate::schema::wallpapers::dsl::*;
    let connection = establish_connection();
    let pages = wallpapers.count().get_result(&connection).unwrap_or(0);

    pages
}
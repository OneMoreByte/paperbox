use super::handlers;
use super::models::{ Wallpaper, Theme };

use std::collections::HashMap;
use warp::Filter;
use dotenv::dotenv;
use std::env;

// Filter for health check
pub fn health() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path!("healthz").map(|| "Healthy!")
}

// Filters for /wallpaper/...
pub fn wallpaper()  -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {

    let wallpaper =  warp::path("wallpaper");

    // PUT    /wallpaper
    let wallpaper_put = warp::put()
        .and(wallpaper)
        .and(warp::body::json())
        .and_then(handlers::wallpaper::put);
        
    // GET    /wallpaper?name=String&tags=[String]&page=i32
    let wallpaper_get = warp::get()
        .and(wallpaper)
        .and(warp::path::end())
        .and(warp::query::<HashMap<String,String>>())
        .and_then(handlers::wallpaper::get);

    let wallpaper_id = wallpaper
        .and(warp::path::param::<i32>());

    // GET    /wallpaper/id/
    let wallpaper_id_get = warp::get()
        .and(wallpaper_id)
        .and(warp::path::end())
        .and_then(handlers::wallpaper::get_by_id);

    // GET    /wallpaper/id/
    let wallpaper_id_get = warp::get()
    .and(wallpaper_id)
    .and(warp::path::end())
    .and_then(handlers::wallpaper::get_by_id);

    // POST   /wallpaper/id/
    let wallpaper_id_post = warp::post()
        .and(wallpaper_id)
        .and(warp::body::json())
        .and(warp::path::end())
        .and_then(handlers::wallpaper::post_by_id);

    // DELETE /wallpaper/id/
    let wallpaper_id_del = warp::delete()
        .and(wallpaper_id)
        .and(warp::path::end())
        .and_then(handlers::wallpaper::delete_by_id);

    wallpaper_put
        .or(wallpaper_get)
        .or(wallpaper_id_get)
//        .or(wallpaper_id_post)
        .or(wallpaper_id_del)

}

// Filters for /theme/id/
pub fn theme()  -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let theme = warp::path("theme")
        .and(warp::path::param::<i32>());

    // GET    /theme/id/
    let theme_get = warp::get()
    .and(theme)
    .and_then(handlers::theme::get);

    // POST   /theme/id/
    let theme_post = warp::post()
        .and(theme)
        .and(warp::body::json())
        .and_then(handlers::theme::post);

   // DELETE /theme/id/
   let theme_del = warp::delete()
        .and(theme)
        .and_then(handlers::theme::delete);

    theme_get 
 //       .or(theme_post)
        .or(theme_del)

}


// Filters for /theme/id/
pub fn themes()  -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let theme = warp::path("themes")
        .and(warp::path::end());

    // POST    /themes
    let theme_get = warp::post()
    .and(warp::body::json())
    .and_then(handlers::theme::get_multiple);

    theme_get

}

pub fn image() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    dotenv().ok();

    let base_directory = match env::var("STORAGE_PATH") {
        Ok(val) => val,
        Err(e) => "./".to_string(),
    };

    warp::get()
        .and(warp::path("image"))
        .and(warp::fs::dir(base_directory))

}

pub fn template()  -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::post()
    .and(warp::path("template"))
    .and(warp::body::json())
    .and_then(handlers::template::post)
}

pub fn frontend() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    dotenv().ok();

    let app_dir = match env::var("FRONTEND_PATH") {
        Ok(val) => val,
        Err(e) => "./".to_string(),
    };

    warp::get()
        .and(warp::fs::dir(app_dir))
}
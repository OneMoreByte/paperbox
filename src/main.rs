#[macro_use] extern crate diesel;

use self::diesel::prelude::*;
use std::collections::HashMap;
use warp::Filter;


mod db;
mod server;
mod models;
mod schema;

#[tokio::main]
async fn main() {
    let ip = [127, 0, 0, 1];
    let port = 3030;

    let db_user = "postgres";
    let db_pass = "password";
    let db_url = "postgres://postgres:password@localhost";
    let db_connection_string = format!("postgres://{}:{}@{}", db_user, db_pass, db_url);

    println!(
        "Staring server on {}.{}.{}.{}:{}", 
        ip[0], ip[1], ip[2], ip[3], port
    );

    println!(
        "Using potgress db on {} as {}",
        db_url, db_user
    );
    

    let health = warp::path!("healthz").map(|| "Healthy!");

    let wallpaper =  warp::path("wallpaper");

    // PUT    /wallpaper
    let wallpaper_put = warp::put()
        .and(wallpaper)
        .and(warp::body::json())
        .and_then(server::wallpaper::put);
        
    // GET    /wallpaper?name=String&tags=[String]&page=i32
    let wallpaper_get = warp::get()
        .and(wallpaper)
        .and(warp::query::<HashMap<String, String>>())
        .map(|aaa: HashMap<String, String> | "yoot"); //server::wallpaper::get(aaa));

    let wallpaper_id = wallpaper
        .and(warp::path::param::<i32>());

    // GET    /wallpaper/id/
    let wallpaper_id_get = warp::get()
        .and(wallpaper_id)
        .and_then(server::wallpaper::get_by_id);

    // POST   /wallpaper/id/
 /*   let wallpaper_id_post = warp::post()
        .and(wallpaper_id)
        .map(|aa| "heck"); */

   // DELETE /wallpaper/id/
   let wallpaper_id_del = warp::delete()
        .and(wallpaper_id)
        .and_then(server::wallpaper::delete_by_id);

    let wallpaper_routes = wallpaper_put
      //  .or(wallpaper_get)
        .or(wallpaper_id_get)
//        .or(wallpaper_id_post)
        .or(wallpaper_id_del);


    let theme = warp::path("theme")
        .and(warp::path::param::<i32>());

    // GET    /wallpaper/id/
    let theme_get = warp::get()
    .and(theme)
    .map(|aa| "heck");

    // POST   /wallpaper/id/
    let theme_post = warp::post()
        .and(theme)
        .map(|aa| "heck");

   // DELETE /wallpaper/id/
   let theme_del = warp::delete()
        .and(theme)
        .map(|aaa| "heck");

    let theme_routes = theme_get 
        .or(theme_post)
        .or(theme_del);

    let router = health
        .or(wallpaper_routes)
        .or(theme_routes);

    warp::serve(router)
        .run((ip, port))
        .await;
}

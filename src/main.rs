#[macro_use] extern crate diesel;

use warp::Filter;

mod db;
mod filters;
mod handlers;
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
    
    let router = filters::health()
        .or(filters::wallpaper())
        .or(filters::theme())
        .or(filters::image());


    warp::serve(router)
        .run((ip, port))
        .await;
}

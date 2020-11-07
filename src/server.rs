use serde_derive::{Deserialize, Serialize};


#[derive(Deserialize, Serialize)]
pub(crate) struct WallpaperQuery {
    name: String,
    tags: String,
    page: i32
} 

#[derive(Deserialize, Serialize)]
pub(crate) struct WallpaperRequest {
    name: String,
    tags: String,
    data: String
} 
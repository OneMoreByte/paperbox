use serde_derive::{Deserialize, Serialize};
use base64::{encode, decode};
use crate::schema::wallpapers;
    

#[derive(Deserialize, Serialize)]
pub struct WallpaperRequest {
    name: String,
    tags: Vec<String>,
    data: String
}

impl WallpaperRequest {
    pub fn get_name(&self) -> String {
        self.name.clone()
    }
} 

#[derive(Queryable, Insertable, Deserialize, Serialize)]
#[table_name="wallpapers"]
pub struct Wallpaper {
    name: String,
    preview: String,
    fullimage: String,
    tags: Option<Vec<String>>,
    themes: Option<Vec<i32>>
}

impl Wallpaper {

    pub fn new(request: WallpaperRequest) -> Wallpaper {
        
        let full_image = "".to_string();
        let preview = "".to_string();
        let themes: Vec<i32> = vec![0];

        Wallpaper { 
            name: request.name, 
            preview: preview, 
            fullimage: full_image, 
            tags: Some(request.tags), 
            themes:  Some(themes)
        }
    }

    pub fn to_string(&self) -> String {
        return format!("name: {}\npreview: {},\nimage: {}", self.name, self.preview, self.fullimage);
    }
}

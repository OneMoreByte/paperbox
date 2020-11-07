use serde_derive::{Deserialize, Serialize};

#[derive(Queryable, Deserialize, Serialize)]
pub struct Wallpaper {
    name: String,
    preview: String,
    full_image: String,
    tags: Vec<String>,
    themes: Vec<String>
}

impl Wallpaper {
   /* fn new() -> Wallpaper {
        return null;
    }*/ 

    pub fn to_string(&self) -> String {
        return format!("name: {}\npreview: {},\nimage: {}", self.name, self.preview, self.full_image);
    }
}
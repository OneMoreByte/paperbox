extern crate serde;
extern crate serde_json;
use serde_derive::{Deserialize, Serialize};
use base64::{encode, decode};
use crate::schema::wallpapers;




#[derive(Queryable, Insertable, Identifiable, Deserialize, Serialize)]
#[table_name="wallpapers"]
pub struct Wallpaper {
    id: i32,
    name: String,
    preview: String,
    full_image: String,
    tags: Vec<String>,
    themes: Option<Vec<i32>>,
    datahash: String
}

impl Wallpaper {
    pub fn name(&self) -> String { self.name.clone() }

    pub fn to_string(&self) -> String {
        return format!("name: {}\npreview: {},\nimage: {}", self.name, self.preview, self.full_image);
    }
}

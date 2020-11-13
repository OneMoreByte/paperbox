use serde_derive::{Deserialize, Serialize};
use crate::schema::themes;

#[derive(Queryable, Insertable, Deserialize, Serialize)]
#[table_name="themes"]
pub struct Theme {
    name: String,
    foreground: String,
    background: String,
    cursor: String,
    colors: Vec<String>,    
}

impl Theme {
    pub fn to_string(&self) -> String {
        return format!("name: {}", self.name);
    }
}
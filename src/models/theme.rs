use serde_derive::{Deserialize, Serialize};
use crate::schema::themes;

#[derive(Queryable, Insertable, Identifiable, Deserialize, Serialize)]
#[table_name="themes"]
pub struct Theme {
    id: i32,
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

    pub fn name(&self) -> String { self.name.clone() }
}
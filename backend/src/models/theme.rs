use serde_derive::{Deserialize, Serialize};
use crate::schema::themes;

#[derive(Queryable, Insertable, Identifiable, Deserialize, Serialize)]
#[table_name="themes"]
pub struct Theme {
    pub id: i32,
    pub name: String,
    pub foreground: String,
    pub background: String,
    pub cursor: String,
    pub colors: Vec<String>,    
}

impl Theme {
    pub fn to_string(&self) -> String {
        return format!("name: {}", self.name);
    }

    pub fn name(&self) -> String { self.name.clone() }
}
use serde_derive::{Deserialize, Serialize};

#[derive(Queryable, Deserialize, Serialize)]
pub struct Theme {
    name: String,
    colors: [i32;16],    
}

impl Theme {
    fn to_string(&self) -> String {
        return format!("name: {}", self.name);
    }
}
table! {
    themes (id) {
        id -> Int4,
        name -> Varchar,
        colors -> Nullable<Array<Int4>>,
    }
}

table! {
    wallpapers (id) {
        id -> Int4,
        name -> Varchar,
        preview -> Text,
        fullimage -> Text,
        tags -> Nullable<Array<Text>>,
        themes -> Nullable<Array<Int4>>,
    }
}

allow_tables_to_appear_in_same_query!(
    themes,
    wallpapers,
);

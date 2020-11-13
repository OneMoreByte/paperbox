table! {
    themes (id) {
        id -> Int4,
        name -> Varchar,
        foreground -> Varchar,
        background -> Varchar,
        cursor -> Varchar,
        colors -> Nullable<Array<Varchar>>,
    }
}

table! {
    wallpapers (id) {
        id -> Int4,
        name -> Varchar,
        preview -> Text,
        full_image -> Text,
        tags -> Nullable<Array<Text>>,
        themes -> Nullable<Array<Int4>>,
        datahash -> Varchar,
    }
}

allow_tables_to_appear_in_same_query!(
    themes,
    wallpapers,
);

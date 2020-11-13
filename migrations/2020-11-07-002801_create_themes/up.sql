-- Your SQL goes here
CREATE TABLE themes (
	id SERIAL PRIMARY KEY,
	name VARCHAR not NULL,
	foreground VARCHAR,
	background VARCHAR,
	cursor VARCHAR,
	colors VARCHAR[]
)

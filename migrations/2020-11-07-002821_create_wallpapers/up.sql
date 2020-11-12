CREATE TABLE wallpapers (
	id SERIAL PRIMARY KEY,
	name VARCHAR not NULL,
	preview text not NULL,
	full_image text not NULL,
	tags text[],
	themes integer[]
)

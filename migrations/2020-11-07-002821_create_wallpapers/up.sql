CREATE TABLE wallpapers (
	id SERIAL PRIMARY KEY,
	name VARCHAR not NULL,
	preview text not NULL,
	fullimage text not NULL,
	tags text[],
	themes integer[]
)

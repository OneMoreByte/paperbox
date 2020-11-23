export class Wallpaper {
    id: number;
    name: String;
    preview: String;
    full_image: String;
    tags: String[];
    themes: number[];
    datahash: String;

    constructor() {
        this.id = 0;
        this.name = "";
        this.preview = "";
        this.full_image = "";
        this.tags = [];
        this.themes = [];
        this.datahash = "";
    }
}

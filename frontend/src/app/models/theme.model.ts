export class ThemeModel {
    id: number;
    name: String;
    foreground: String;
    background: String;
    cursor: String;
    colors: String[];

    constructor() {
        this.id = 0;
        this.name = "";
        this.foreground = "";
        this.background = "";
        this.cursor = "";
        this.colors = [];
    }
}
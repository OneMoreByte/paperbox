import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-wallpaper-preview',
  templateUrl: './wallpaper-preview.component.html',
  styleUrls: ['./wallpaper-preview.component.scss']
})
export class WallpaperPreviewComponent implements OnInit {
  @Input() preview: String;
  url = "";
  constructor() { }

  ngOnInit(): void {
    this.url = "http://localhost:3030" + this.preview;
  }

}

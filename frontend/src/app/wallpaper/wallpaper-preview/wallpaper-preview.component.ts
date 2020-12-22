import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-wallpaper-preview',
  templateUrl: './wallpaper-preview.component.html',
  styleUrls: ['./wallpaper-preview.component.scss']
})
export class WallpaperPreviewComponent implements OnInit {
  @Input() previewUrl: String;

  constructor() { }

  ngOnInit(): void {
  }

}

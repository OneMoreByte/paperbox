import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallpaper-title',
  templateUrl: './wallpaper-title.component.html',
  styleUrls: ['./wallpaper-title.component.scss']
})
export class WallpaperTitleComponent implements OnInit {
  @Input() name: String;
  
  constructor() { }

  ngOnInit(): void {
  }

}

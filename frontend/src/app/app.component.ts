import { Component } from '@angular/core';
import { Wallpaper } from './wallpaper';
import { WallpaperService } from './wallpaper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  constructor() {}
}


import { WallpaperModel } from './wallpaper.model';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { ThemesService } from '../themes.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.scss'],
  providers: [ThemeSelectorComponent]
})
export class WallpaperComponent implements OnInit {
  @Input() data : WallpaperModel;
  
  baseUrl = "http://localhost:3030"
  themeService: ThemesService;
  wallpaperUrl: string;
  previewUrl: string;


  constructor(private http: HttpClient) { 
    this.themeService = new ThemesService(http);
 
  }

  ngOnInit(): void {
    this.wallpaperUrl = this.baseUrl + this.data.full_image;
    this.previewUrl = this.baseUrl + this.data.preview;
  }

}

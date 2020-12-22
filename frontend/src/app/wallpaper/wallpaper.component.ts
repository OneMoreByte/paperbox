
import { WallpaperModel } from './wallpaper.model';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { ThemesService } from '../themes.service';
import { HttpClient } from '@angular/common/http';
import { ThemeModel } from '../models/theme.model';
import { PaperboxService } from '../paperbox.service';


@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.scss'],
  providers: [ThemeSelectorComponent]
})
export class WallpaperComponent implements OnInit {
  @Input() data : WallpaperModel;
  @Input() paperboxService: PaperboxService;
  
  baseUrl = "http://localhost:3030"
  themeService: ThemesService;
  wallpaperUrl: string;
  previewUrl: string;
  selectedTheme: ThemeModel = new ThemeModel();


  constructor(private http: HttpClient) { 
    this.themeService = new ThemesService(http);
 
  }

  ngOnInit(): void {
    this.wallpaperUrl = this.baseUrl + this.data.full_image;
    this.previewUrl = this.baseUrl + this.data.preview;
    this.themeService.selectedThemeSubject.subscribe(res => {
      if (res)
        this.selectedTheme = res;
      else
        this.selectedTheme = new ThemeModel();
    });
  }

}


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
  
  themeService: ThemesService;
  
  constructor(private http: HttpClient) { 
    this.themeService = new ThemesService(http);
  }

  ngOnInit(): void {

  }

}

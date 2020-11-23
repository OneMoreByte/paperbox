import { Component, OnInit } from '@angular/core';
import { Wallpaper } from '../wallpaper';
import { Theme } from '../theme';
import { WallpaperService } from '../wallpaper.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-wallpapers',
  templateUrl: './wallpapers.component.html',
  styleUrls: ['./wallpapers.component.scss']
})
export class WallpapersComponent implements OnInit {

  wallpapers: Wallpaper[] = []; 
  themes: Theme[] = [];

  constructor(private wallpaperService: WallpaperService) { }

  ngOnInit(): void {
    this.wallpaperService.getWallpapers().subscribe( 
      (response) => {                           //next() callback
        console.log('response received');
        console.log(response);
        this.wallpapers = response;
        response.forEach(wallpaper => {
          wallpaper.themes.forEach(async theme_id => {
            this.themes[theme_id] = await this.wallpaperService.getTheme(theme_id).toPromise();
          });
        });
      },
      (error) => {                              //error() callback
        console.error('Request failed with error');
        this.wallpapers = [];
      }
    );
  }

}

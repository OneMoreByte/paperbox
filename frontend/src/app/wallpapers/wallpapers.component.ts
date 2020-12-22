import { Component, OnInit } from '@angular/core';
import { WallpaperModel } from '../wallpaper/wallpaper.model';
import { WallpaperComponent } from '../wallpaper/wallpaper.component';
import { WallpapersService } from '../wallpapers.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'wallpapers',
  templateUrl: './wallpapers.component.html',
  styleUrls: ['./wallpapers.component.scss']
})
export class WallpapersComponent implements OnInit {
  wallpapers: WallpaperModel[];
  private wallpapersService: WallpapersService;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.wallpapersService = new WallpapersService(this.http);
    this.wallpapersService.getWallpapers().subscribe(data => {
      this.wallpapers = data;
    });
    console.log(this.wallpapers);
  }

}

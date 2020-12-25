import { Component, Input, OnInit } from '@angular/core';
import { WallpaperModel } from '../wallpaper/wallpaper.model';
import { WallpaperComponent } from '../wallpaper/wallpaper.component';
import { WallpapersService } from '../wallpapers.service';
import { PaperboxService } from '../paperbox.service';
import { HttpClient } from '@angular/common/http';
import { ElectronService } from '../core/services';

@Component({
  selector: 'wallpapers',
  templateUrl: './wallpapers.component.html',
  styleUrls: ['./wallpapers.component.scss']
})
export class WallpapersComponent implements OnInit {
  wallpapers: WallpaperModel[];
  private wallpapersService: WallpapersService;
  paperboxService: PaperboxService;

  constructor(private http: HttpClient) {
    this.paperboxService = new PaperboxService();
  }

  ngOnInit(): void {
    this.wallpapersService = new WallpapersService(this.http);
    this.wallpapersService.getWallpapers(this.paperboxService.config.serverUrl).subscribe(data => {
      this.wallpapers = data;
    });
    console.log(this.wallpapers);
  }

}

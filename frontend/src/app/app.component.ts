import { Component } from '@angular/core';
import { WallpaperService } from './wallpaper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  wallpapers = [];
  constructor(private wallpaperService: WallpaperService) {
    wallpaperService.getWallpapers().subscribe( 
      (response) => {                           //next() callback
        console.log('response received')
        console.log(response)
        return response
      },
      (error) => {                              //error() callback
        console.error('Request failed with error')
        return []
      },
      () => {                                   //complete() callback
        console.error('Request completed')      //This is actually not needed 
        return []
      }
    );
  }



}

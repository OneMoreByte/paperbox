
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { WallpaperModel } from './wallpaper/wallpaper.model';

@Injectable({
  providedIn: 'root'
})
export class WallpapersService {


  constructor(private http: HttpClient) { 
  }

  getWallpapers(url, page=0, tags=[]): Observable<WallpaperModel[]> {
    return this.http.get<WallpaperModel[]>(url + "/wallpaper");
  }
}

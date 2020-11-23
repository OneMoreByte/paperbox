import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Wallpaper } from './wallpaper';
import { Theme } from './theme';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WallpaperService {

  constructor( private http: HttpClient) { }

  public getWallpapers(): Observable<Wallpaper[]>  {
     return this.http.get<Wallpaper[]>("http://localhost:3030/wallpaper");
  }

  public getTheme(id: number) {
    return this.http.get<Theme>("http://localhost:3030/theme/" + id + "/");
  }

}

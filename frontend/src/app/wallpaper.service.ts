import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Wallpaper } from './wallpaper';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WallpaperService {

  constructor( private http: HttpClient) { }

  public getWallpapers(): Observable<Wallpaper[]>  {
    return this.http.get<Wallpaper[]>("http://172.24.97.175:3030/wallpaper");
  }


}

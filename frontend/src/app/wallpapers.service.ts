import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WallpapersService {

  constructor(private http: HttpClient) { }

  getWallpapers(page, tags) {
    return this.http.get("http://localhost:3030/wallpapers");
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ThemeModel } from './models/theme.model';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  selectedTheme: ThemeModel;
  selectedThemeSubject: Subject<ThemeModel>;
  constructor(private http: HttpClient) { 
    this.selectedThemeSubject = new Subject();
  }

  getThemes(url, idArray): Observable<ThemeModel[]> {
    let request = {
      ids: idArray
    };
    const headers = {
       'Content-Type':  'application/json'
    }
      
    return this.http.post<ThemeModel[]>(url + "/themes", request, {headers});
  }

  observeSelectedTheme(): Observable<ThemeModel> {
    return of(this.selectedTheme);
  }

  setSelectedTheme(theme: ThemeModel) {
    this.selectedThemeSubject.next(theme);
  }
}

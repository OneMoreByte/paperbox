import { Component, Input, OnInit } from '@angular/core';
import { ThemesService } from '../../themes.service';
import { ThemeModel } from '../../models/theme.model';
@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
  providers: [ThemesService]
})
export class ThemeSelectorComponent implements OnInit {
  @Input() themeIds: number[]; 
  @Input() themeService: ThemesService;

  themes: ThemeModel[] = [];
  selectedTheme: ThemeModel;

  constructor() { }

  ngOnInit(): void {
    this.themeService.getThemes(this.themeIds)
      .subscribe(res => { 
        this.themes = res; 
        this.themeService.setSelectedTheme(this.themes[0]);
      });
  }

  onClick(theme) {
    this.themeService.setSelectedTheme(theme);
  }
}

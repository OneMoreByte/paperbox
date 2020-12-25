import { Component, Input, OnInit } from '@angular/core';
import { ThemesService } from '../../themes.service';
import { ThemeModel } from '../../models/theme.model';
import { Config } from '../../paperbox.service';
@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
  providers: [ThemesService]
})
export class ThemeSelectorComponent implements OnInit {
  @Input() themeIds: number[]; 
  @Input() themeService: ThemesService;
  @Input() config: Config;

  themes: ThemeModel[] = [];
  selectedTheme: ThemeModel = new ThemeModel();

  constructor() { }

  ngOnInit(): void {
    this.themeService.getThemes(this.config.serverUrl, this.themeIds)
      .subscribe(res => { 
        this.themes = res; 
        this.themeService.setSelectedTheme(this.themes[0]);
      });
  }

  onClick(theme) {
    this.themeService.setSelectedTheme(theme);
  }
}

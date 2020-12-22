import { Component, Input, OnInit } from '@angular/core';
import { ThemeModel } from '../../models/theme.model';
import { ThemesService } from '../../themes.service';


@Component({
  selector: 'wallpaper-apply',
  templateUrl: './wallpaper-apply.component.html',
  styleUrls: ['./wallpaper-apply.component.scss']
})
export class WallpaperApplyComponent implements OnInit {
  @Input() themeService: ThemesService;
  @Input() wallpaperUrl: string;

  applyText: string;
  selectedTheme: ThemeModel;

  constructor() { 
    this.applyText = "Apply"
  }

  ngOnInit(): void {
    this.themeService.selectedThemeSubject.subscribe(res => {
      if (res)
        this.selectedTheme = res;
    });
  }

  apply() {
    console.log("Clicked!")
  }

}

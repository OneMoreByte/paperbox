import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'keyv';
import { ThemeModel } from '../../models/theme.model';
import { PaperboxService, SelectedPair } from '../../paperbox.service';
import { ThemesService } from '../../themes.service';
import { WallpaperModel } from '../wallpaper.model';


@Component({
  selector: 'wallpaper-apply',
  templateUrl: './wallpaper-apply.component.html',
  styleUrls: ['./wallpaper-apply.component.scss']
})
export class WallpaperApplyComponent implements OnInit {
  @Input() themeService: ThemesService;
  @Input() paperboxService: PaperboxService;
  @Input() wallpaper: WallpaperModel;

  applyText: string;
  selectedTheme: ThemeModel = new ThemeModel();

  constructor() { 
    this.applyText = "Apply"
  }

  ngOnInit(): void {
    this.themeService.selectedThemeSubject.subscribe(res => {
      if (res)
        this.selectedTheme = res;
    });

    this.paperboxService.selectedPairSubject.subscribe(res => {
      let theme: SelectedPair = res; 
        if (res.theme === this.selectedTheme)
          this.applyText = "Applied";
        else
          this.applyText = "Apply";
    })
  }

  apply() {
    this.paperboxService.setActivePair(this.wallpaper, this.selectedTheme);
  }

}

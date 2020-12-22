import { Component, Input, OnInit } from '@angular/core';
import { ThemeModel } from '../../models/theme.model';
import { ThemesService } from '../../themes.service';


@Component({
  selector: 'app-editor-preview',
  templateUrl: './editor-preview.component.html',
  styleUrls: ['./editor-preview.component.scss', "../../../../node_modules/highlight.js/styles/github.css"],
  providers: [ThemesService]
})
export class EditorPreviewComponent implements OnInit {
  @Input() themeService: ThemesService;
  constructor( ) { }
  selectedTheme: ThemeModel = new ThemeModel();

  ngOnInit(): void {
    this.themeService.selectedThemeSubject.subscribe(res => {
      if (res) {
        console.log(res);
        this.selectedTheme = res;
      }
    });
  }

}

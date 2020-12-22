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
  selectedTheme: ThemeModel;
  code = `use warp::Filter;

  // TODO: Write some documentation
  [#tokio::main]
  async fn main() {
      let hw: String = "Hello world";
      println!(hw);
      let hello = warp::path!("hello" / String)
          .map(|name| format!("{}: {}", hw, name)); 
  
      warp::serve(hello)
          .run(([127, 0, 0, 1], 3030))
          .await;
  }`;

  ngOnInit(): void {
    this.themeService.selectedThemeSubject.subscribe(res => {
      if (res) {
        console.log(res);
        this.selectedTheme = res;
      }
    });
  }

}

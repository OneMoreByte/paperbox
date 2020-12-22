import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';

import { AppComponent } from './app.component';
import { WallpapersComponent } from './wallpapers/wallpapers.component';
import { WallpaperTitleComponent } from './wallpaper/wallpaper-title/wallpaper-title.component';
import { WallpaperPreviewComponent } from './wallpaper/wallpaper-preview/wallpaper-preview.component';
import { WallpaperApplyComponent } from './wallpaper/wallpaper-apply/wallpaper-apply.component';
import { EditorPreviewComponent } from './wallpaper/editor-preview/editor-preview.component';
import { ThemeSelectorComponent } from './wallpaper/theme-selector/theme-selector.component';
import { ThemeComponent } from './wallpaper/theme-selector/theme/theme.component';
import { WallpaperComponent } from './wallpaper/wallpaper.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent, 
    WallpapersComponent, 
    WallpaperComponent,
    WallpaperTitleComponent, 
    WallpaperApplyComponent,
    WallpaperPreviewComponent, 
    EditorPreviewComponent, 
    ThemeSelectorComponent, 
    ThemeComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DetailModule,
    AppRoutingModule,
    HighlightModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

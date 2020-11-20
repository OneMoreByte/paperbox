import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeComponent } from './theme/theme.component';
import { WallpaperService } from './wallpaper.service';
import { WallpapersComponent } from './wallpapers/wallpapers.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeComponent,
    WallpapersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [WallpaperService],
  bootstrap: [AppComponent]
})
export class AppModule { }

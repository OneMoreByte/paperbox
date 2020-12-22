import { Injectable } from '@angular/core';

import { ThemeModel } from './models/theme.model';
import { WallpaperModel } from './models/wallpaper.model';
import { Subject } from 'rxjs';


import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class PaperboxService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  selectedWallaper: WallpaperModel;
  selectedTheme: ThemeModel;
  selectedPairSubject: Subject<SelectedPair>;

  templateDir = "/home/jsck/.paperbox/templates";

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  setActivePair(wallpaper: WallpaperModel, theme: ThemeModel) {
    this.selectedTheme = theme;
    this.selectedWallaper = wallpaper;
    console.log(this.isElectron)
    this.selectedPairSubject.next(new SelectedPair(wallpaper, theme));
    console.log(`Applying wallpaper ${wallpaper.id} and theme ${theme.id}`)

    let templates = this.fs.readdir(this.templateDir, { withFileTypes: true }, (err, files) => {
      console.log(err);
      console.log(`There would be ${files.length} file(s) to template`)
    });
  }

  is_selected(theme: ThemeModel) {
    return this.selectedTheme === theme;
  }

  constructor() {
    this.selectedPairSubject = new Subject();
    this.selectedWallaper = new WallpaperModel();
    this.selectedTheme = new ThemeModel();
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;

      // If you wan to use remote object, pleanse set enableRemoteModule to true in main.ts
      // this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }
}

export class SelectedPair {
  theme: ThemeModel;
  wallpaper: WallpaperModel;
  constructor(wallpaper: WallpaperModel, theme: ThemeModel) {
    this.theme = theme;
    this.wallpaper = wallpaper;
  }
}

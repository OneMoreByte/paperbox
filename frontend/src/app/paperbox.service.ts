import { Injectable } from '@angular/core';

import { ThemeModel } from './models/theme.model';
import { WallpaperModel } from './models/wallpaper.model';
import { Subject } from 'rxjs';


import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as http from 'http';
import * as axios from 'axios';
import { stringify } from '@angular/compiler/src/util';
import { collectExternalReferences } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PaperboxService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  http: typeof http;
  axios: typeof axios;

  config: Config;
  selectedPairSubject: Subject<SelectedPair>;

  baseDir: string;
  templateDir: string;
  preApplyScripts: string;
  postApplyScripts: string;
  processedTemplateDir: string;
  wallpaperPath: string;
  configPath: string;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  setActivePair(wallpaper: WallpaperModel, theme: ThemeModel) {
    if (this.isElectron) {
      this.config.selectedTheme = theme;
      this.config.selectedWallpaper = wallpaper;
      console.log(this.isElectron)
      this.selectedPairSubject.next(new SelectedPair(wallpaper, theme));
      this.runPreApplyScripts();
      console.log(`Applying wallpaper ${wallpaper.id} and theme ${theme.id}`);
      this.getWallpaper();
      this.templateFiles();
      this.runPostApplyScripts();
    } else {
      throw "Tried to set active pair in non-electron environment"
    }
  }

  private readConfig(): Config {
    return new Config()
  }
  
  private writeConfig() {

  }

  private getWallpaper() {
    let wallpaperFile = this.fs.createWriteStream(this.wallpaperPath);
    let wallpaperUrl = this.config.serverUrl + this.config.selectedWallpaper.full_image;
    let options = {agent: false};
    this.http.get(wallpaperUrl, options, (res) => {
      res.pipe(wallpaperFile);
    });
  }

  private createDataDirs() {
    let dirs = [this.templateDir, this.preApplyScripts, this.postApplyScripts, this.processedTemplateDir];
    dirs.forEach( dir => {
      if (!this.fs.existsSync(dir))
        this.fs.mkdirSync(dir, { recursive: true });
    });
  }

  private templateFiles() {
    let templates = this.fs.readdirSync(this.templateDir, { withFileTypes: true });
    let files = new Map<string, string>();
    templates.forEach((template) => {
      if (template.isFile()) {
        files[template.name] = this.fs.readFileSync(this.templateDir + "/" + template.name).toString();
      }
    })
    let postData = JSON.stringify({theme_id: this.config.selectedTheme.id, files: files })
    console.log(postData);
    let options = {
      agent: false,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    }
    let url = this.config.serverUrl + "/template";
    console.log(url);
    let req = this.http.request(url, options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
      let data = JSON.parse(chunk);
		  console.log(chunk);
          Object.keys(data['files']).forEach(key => {
            console.log("Writing out " + key);
            this.fs.writeFileSync(this.processedTemplateDir + "/" + key, data['files'][key]);
          });
      });
    });
    req.write(postData);
    req.end();
  }

  private runPreApplyScripts() {
    let scripts = this.fs.readdirSync(this.preApplyScripts, { withFileTypes: true });
    scripts.forEach( (file) => {
      console.log(`Running pre-apply executable: ${file}`);
      this.execFile(this.preApplyScripts, file);
    });
  }

  private runPostApplyScripts() {
    let scripts = this.fs.readdirSync(this.postApplyScripts, { withFileTypes: true });
    scripts.forEach( (file) => {
      console.log(`Running post-apply executable: ${file.name}`);
      this.execFile(this.postApplyScripts, file);
    });
  }

  private execFile(dir: string, script: fs.Dirent) {
    if (script.isFile())
      this.childProcess.execFileSync(dir + "/" + script.name);
    else
      console.log(`ERR: The entry ${script.name} is not a file`)
  }

  constructor() {
    this.selectedPairSubject = new Subject();
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;

      // If you wan to use remote object, pleanse set enableRemoteModule to true in main.ts
      // this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.http = window.require('http');
      this.axios = window.require('axios');

      this.baseDir = window.process.env.HOME + "/.paperbox/";
      this.templateDir = this.baseDir + "templates";
      this.processedTemplateDir = this.baseDir + "processed";
      this.preApplyScripts = this.baseDir + "pre.rc"
      this.postApplyScripts = this.baseDir + "post.rc"
      this.wallpaperPath = this.baseDir + "wallpaper.png"
      this.configPath = this.baseDir + "config.json"

      this.createDataDirs();
      this.config = this.readConfig();
    }
  }

  close() {
    this.writeConfig();
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

class Config {
  selectedTheme: ThemeModel;
  selectedWallpaper: WallpaperModel;
  serverUrl: string = "http://localhost:3030";
}

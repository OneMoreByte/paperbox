import { Component, OnInit } from '@angular/core';
import { WallpaperModel } from '../wallpaper/wallpaper.model';
import { WallpaperComponent } from '../wallpaper/wallpaper.component';

@Component({
  selector: 'wallpapers',
  templateUrl: './wallpapers.component.html',
  styleUrls: ['./wallpapers.component.scss']
})
export class WallpapersComponent implements OnInit {
  wallpapers: WallpaperModel[] = [{"id":1,"name":"sunset-coffee","preview":"/image/e0bcd2c431b7480b814abcb289f271cf/preview.png","full_image":"/image/e0bcd2c431b7480b814abcb289f271cf/full_image.png","tags":["pink","anime","sunset-coffee"],"themes":[1,2,3,4,5],"datahash":"8zoNZ7djWxUaiLI92Ctr+G/9JwMA2vgGg4L2mC6IOJY="},{"id":3,"name":"spoopy-trees","preview":"/image/1955c2472eb54b8488a41767e7f55edc/preview.png","full_image":"/image/1955c2472eb54b8488a41767e7f55edc/full_image.png","tags":["pink","anime","spoopy-trees"],"themes":[11,12,13,14,15],"datahash":"mxD3ZXFpJVihOg9ixJPscf0EhRasZd3TJcPj1xkwEiM="},{"id":5,"name":"nausicaa1","preview":"/image/083414f079824b6bbc582e091cb7f988/preview.png","full_image":"/image/083414f079824b6bbc582e091cb7f988/full_image.png","tags":["pink","anime","nausicaa1"],"themes":[21,22,23,24,25],"datahash":"3+3KdflVeEElsrEQO4+9DSUn3f8XAUydPRSHSlxD4gM="},{"id":4,"name":"buta1","preview":"/image/40011f76cb994c1b8c7c9174b2c507ab/preview.png","full_image":"/image/40011f76cb994c1b8c7c9174b2c507ab/full_image.png","tags":["pink","anime","buta1"],"themes":[16,17,18,19,20],"datahash":"luVks5OWGkNuK0rL6YtCdDfBowN8ieM7zi8/nPa6IIU="},{"id":2,"name":"above","preview":"/image/22c7053d665a48a4a86c20a29302eb52/preview.png","full_image":"/image/22c7053d665a48a4a86c20a29302eb52/full_image.png","tags":["pink","anime","above"],"themes":[6,7,8,9,10],"datahash":"FDe43KDkq2qWy1vPCEodNyXdMokaDNxIPZzDquKM7Hs="}];

  ngOnInit(): void {
    console.log(this.wallpapers);
  }

}

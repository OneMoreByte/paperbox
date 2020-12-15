import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallpaperTitleComponent } from './wallpaper-title.component';

describe('WallpaperTitleComponent', () => {
  let component: WallpaperTitleComponent;
  let fixture: ComponentFixture<WallpaperTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallpaperTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallpaperTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

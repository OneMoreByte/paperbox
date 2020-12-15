import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallpaperPreviewComponent } from './wallpaper-preview.component';

describe('WallpaperPreviewComponent', () => {
  let component: WallpaperPreviewComponent;
  let fixture: ComponentFixture<WallpaperPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallpaperPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallpaperPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

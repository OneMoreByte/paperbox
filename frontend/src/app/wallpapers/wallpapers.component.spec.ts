import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallpapersComponent } from './wallpapers.component';

describe('WallpapersComponent', () => {
  let component: WallpapersComponent;
  let fixture: ComponentFixture<WallpapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallpapersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallpapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

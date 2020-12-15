import { TestBed } from '@angular/core/testing';

import { WallpapersService } from './wallpapers.service';

describe('WallpapersService', () => {
  let service: WallpapersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WallpapersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

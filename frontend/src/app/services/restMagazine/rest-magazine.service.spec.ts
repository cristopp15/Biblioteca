import { TestBed } from '@angular/core/testing';

import { RestMagazineService } from './rest-magazine.service';

describe('RestMagazineService', () => {
  let service: RestMagazineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestMagazineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

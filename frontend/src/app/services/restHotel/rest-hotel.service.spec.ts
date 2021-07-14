import { TestBed } from '@angular/core/testing';

import { RestHotelService } from './rest-hotel.service';

describe('RestHotelService', () => {
  let service: RestHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AllServicesRestService } from './all-services-rest.service';

describe('AllServicesRestService', () => {
  let service: AllServicesRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllServicesRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

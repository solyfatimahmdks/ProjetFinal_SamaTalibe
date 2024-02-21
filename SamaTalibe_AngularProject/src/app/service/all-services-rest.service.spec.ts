import { TestBed } from '@angular/core/testing';

import { AllservicesService } from './all-services-rest.service';

describe('AllServicesRestService', () => {
  let service: AllservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

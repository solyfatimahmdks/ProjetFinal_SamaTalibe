import { TestBed } from '@angular/core/testing';

import { ListdahraService } from './service/listdahra.service';

describe('ListdahraService', () => {
  let service: ListdahraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListdahraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

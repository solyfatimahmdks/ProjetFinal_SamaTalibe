import { TestBed } from '@angular/core/testing';

import { RoleService } from '../service/role-service.service';

describe('RoleServiceService', () => {
  let service: RoleService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

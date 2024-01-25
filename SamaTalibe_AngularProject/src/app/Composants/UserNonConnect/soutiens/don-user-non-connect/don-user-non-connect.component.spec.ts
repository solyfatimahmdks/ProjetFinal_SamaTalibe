import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonUserNonConnectComponent } from './don-user-non-connect.component';

describe('DonUserNonConnectComponent', () => {
  let component: DonUserNonConnectComponent;
  let fixture: ComponentFixture<DonUserNonConnectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonUserNonConnectComponent]
    });
    fixture = TestBed.createComponent(DonUserNonConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

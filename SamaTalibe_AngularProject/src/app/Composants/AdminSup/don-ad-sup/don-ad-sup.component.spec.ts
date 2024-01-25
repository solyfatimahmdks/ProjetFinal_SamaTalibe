import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonAdSupComponent } from './don-ad-sup.component';

describe('DonAdSupComponent', () => {
  let component: DonAdSupComponent;
  let fixture: ComponentFixture<DonAdSupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonAdSupComponent]
    });
    fixture = TestBed.createComponent(DonAdSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

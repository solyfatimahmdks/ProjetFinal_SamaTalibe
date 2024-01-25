import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonsMaitreComponent } from './dons-maitre.component';

describe('DonsMaitreComponent', () => {
  let component: DonsMaitreComponent;
  let fixture: ComponentFixture<DonsMaitreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonsMaitreComponent]
    });
    fixture = TestBed.createComponent(DonsMaitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

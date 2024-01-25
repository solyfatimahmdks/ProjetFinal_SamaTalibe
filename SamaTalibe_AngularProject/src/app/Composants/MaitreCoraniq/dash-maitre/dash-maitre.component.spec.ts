import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashMaitreComponent } from './dash-maitre.component';

describe('DashMaitreComponent', () => {
  let component: DashMaitreComponent;
  let fixture: ComponentFixture<DashMaitreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashMaitreComponent]
    });
    fixture = TestBed.createComponent(DashMaitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

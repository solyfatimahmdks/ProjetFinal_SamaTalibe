import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DahraComponent } from './dahra.component';

describe('DahraComponent', () => {
  let component: DahraComponent;
  let fixture: ComponentFixture<DahraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DahraComponent]
    });
    fixture = TestBed.createComponent(DahraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

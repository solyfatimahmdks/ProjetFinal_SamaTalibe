import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamaDahraComponent } from './sama-dahra.component';

describe('SamaDahraComponent', () => {
  let component: SamaDahraComponent;
  let fixture: ComponentFixture<SamaDahraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SamaDahraComponent]
    });
    fixture = TestBed.createComponent(SamaDahraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

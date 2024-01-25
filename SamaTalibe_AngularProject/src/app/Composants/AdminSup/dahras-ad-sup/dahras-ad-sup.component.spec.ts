import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DahrasAdSupComponent } from './dahras-ad-sup.component';

describe('DahrasAdSupComponent', () => {
  let component: DahrasAdSupComponent;
  let fixture: ComponentFixture<DahrasAdSupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DahrasAdSupComponent]
    });
    fixture = TestBed.createComponent(DahrasAdSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

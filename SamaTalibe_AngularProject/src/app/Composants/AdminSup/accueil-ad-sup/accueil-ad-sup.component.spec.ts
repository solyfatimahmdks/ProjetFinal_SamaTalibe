import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilAdSupComponent } from './accueil-ad-sup.component';

describe('AccueilAdSupComponent', () => {
  let component: AccueilAdSupComponent;
  let fixture: ComponentFixture<AccueilAdSupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilAdSupComponent]
    });
    fixture = TestBed.createComponent(AccueilAdSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

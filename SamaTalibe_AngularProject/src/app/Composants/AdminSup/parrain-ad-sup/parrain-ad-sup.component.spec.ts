import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParrainAdSupComponent } from './parrain-ad-sup.component';

describe('ParrainAdSupComponent', () => {
  let component: ParrainAdSupComponent;
  let fixture: ComponentFixture<ParrainAdSupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParrainAdSupComponent]
    });
    fixture = TestBed.createComponent(ParrainAdSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

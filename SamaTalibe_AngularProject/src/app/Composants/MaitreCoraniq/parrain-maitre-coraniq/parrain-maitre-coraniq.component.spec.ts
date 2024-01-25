import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParrainMaitreCoraniqComponent } from './parrain-maitre-coraniq.component';

describe('ParrainMaitreCoraniqComponent', () => {
  let component: ParrainMaitreCoraniqComponent;
  let fixture: ComponentFixture<ParrainMaitreCoraniqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParrainMaitreCoraniqComponent]
    });
    fixture = TestBed.createComponent(ParrainMaitreCoraniqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

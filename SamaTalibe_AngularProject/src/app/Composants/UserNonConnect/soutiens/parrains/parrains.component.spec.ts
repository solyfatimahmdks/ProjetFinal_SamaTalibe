import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParrainsComponent } from './parrains.component';

describe('ParrainsComponent', () => {
  let component: ParrainsComponent;
  let fixture: ComponentFixture<ParrainsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParrainsComponent]
    });
    fixture = TestBed.createComponent(ParrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

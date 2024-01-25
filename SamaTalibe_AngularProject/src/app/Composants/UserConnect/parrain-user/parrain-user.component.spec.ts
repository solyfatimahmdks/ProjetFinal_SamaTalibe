import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParrainUserComponent } from './parrain-user.component';

describe('ParrainUserComponent', () => {
  let component: ParrainUserComponent;
  let fixture: ComponentFixture<ParrainUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParrainUserComponent]
    });
    fixture = TestBed.createComponent(ParrainUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

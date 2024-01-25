import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonsUserComponent } from './dons-user.component';

describe('DonsUserComponent', () => {
  let component: DonsUserComponent;
  let fixture: ComponentFixture<DonsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonsUserComponent]
    });
    fixture = TestBed.createComponent(DonsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemUserComponent } from './tem-user.component';

describe('TemUserComponent', () => {
  let component: TemUserComponent;
  let fixture: ComponentFixture<TemUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemUserComponent]
    });
    fixture = TestBed.createComponent(TemUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

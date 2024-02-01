import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTalibesComponent } from './list-talibes.component';

describe('ListTalibesComponent', () => {
  let component: ListTalibesComponent;
  let fixture: ComponentFixture<ListTalibesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTalibesComponent]
    });
    fixture = TestBed.createComponent(ListTalibesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDahraComponent } from './list-dahra.component';

describe('ListDahraComponent', () => {
  let component: ListDahraComponent;
  let fixture: ComponentFixture<ListDahraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDahraComponent]
    });
    fixture = TestBed.createComponent(ListDahraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

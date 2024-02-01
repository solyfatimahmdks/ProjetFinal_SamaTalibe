import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemMaitreComponent } from './tem-maitre.component';

describe('TemMaitreComponent', () => {
  let component: TemMaitreComponent;
  let fixture: ComponentFixture<TemMaitreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemMaitreComponent]
    });
    fixture = TestBed.createComponent(TemMaitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export { TemMaitreComponent };

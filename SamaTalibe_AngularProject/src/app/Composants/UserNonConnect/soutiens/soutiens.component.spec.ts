import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoutiensComponent } from './soutiens.component';

describe('SoutiensComponent', () => {
  let component: SoutiensComponent;
  let fixture: ComponentFixture<SoutiensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoutiensComponent]
    });
    fixture = TestBed.createComponent(SoutiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

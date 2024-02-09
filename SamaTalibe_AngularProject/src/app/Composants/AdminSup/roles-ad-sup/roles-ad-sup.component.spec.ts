import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesAdSupComponent } from './roles-ad-sup.component';

describe('RolesAdSupComponent', () => {
  let component: RolesAdSupComponent;
  let fixture: ComponentFixture<RolesAdSupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolesAdSupComponent]
    });
    fixture = TestBed.createComponent(RolesAdSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

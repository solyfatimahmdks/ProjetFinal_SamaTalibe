import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccueilAdSupComponent } from './accueil-ad-sup.component';
import { AllservicesService } from 'src/app/service/all-services-rest.service';
import { FormsModule } from '@angular/forms'; // Nécessaire si le composant a un ngModel
import { HttpClientModule } from '@angular/common/http'; // Nécessaire si le composant utilise un http client
import { RouterTestingModule } from '@angular/router/testing'; // Nécessaire pour les routerLinkActive
import { HeaderComponent } from '../../HeaderFooter/header/header.component';
import { FooterComponent } from '../../HeaderFooter/footer/footer.component';


describe('AccueilAdSupComponent', () => {
  let component: AccueilAdSupComponent;
  let fixture: ComponentFixture<AccueilAdSupComponent>;
  let allservicesService: AllservicesService;

  beforeEach(async () => {
   TestBed.configureTestingModule({
      declarations: [AccueilAdSupComponent, HeaderComponent, FooterComponent],
      imports: [FormsModule, HttpClientModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AccueilAdSupComponent);
    component = fixture.componentInstance;
    allservicesService = TestBed.inject(AllservicesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve dahras on ngOnInit', () => {
    const dahras = [{ id: 1, name: 'Dahra 1' }, { id: 2, name: 'Dahra 2' }];
    spyOn(allservicesService, 'get').and.callFake((url: string, callback: Function) => {
      callback(dahras);
    });
    component.ngOnInit();
    expect(component.dahras).toEqual(dahras);
  });

  it('should paginate data correctly', () => {
    component.dahras = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    component.itemsPerPage = 2;
    component.setPage(1);
    expect(component.pagedDahras.length).toBe(2);
    expect(component.pagedDahras[0].id).toBe(1);
    expect(component.pagedDahras[1].id).toBe(2);
    component.setPage(2);
    expect(component.pagedDahras.length).toBe(2);
    expect(component.pagedDahras[0].id).toBe(3);
    expect(component.pagedDahras[1].id).toBe(4);
  });
});

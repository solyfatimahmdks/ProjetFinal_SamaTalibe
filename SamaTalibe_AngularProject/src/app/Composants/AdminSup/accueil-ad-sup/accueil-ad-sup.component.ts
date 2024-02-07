import { Component } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  templateUrl: './accueil-ad-sup.component.html',
  selector: 'app-accueil-ad-sup',
  styleUrls: ['./accueil-ad-sup.component.css'],
})

export class AccueilAdSupComponent{
  dahras: any[] = []; 

  
  constructor(private allservicesService: AllservicesService) {}

  ngOnInit(): void {
    this.getAllDahras();
  }

  getAllDahras() {
    this.allservicesService.get('/lister-dahra', (response: any) => {
      this.dahras = response; 
    });
  }
}

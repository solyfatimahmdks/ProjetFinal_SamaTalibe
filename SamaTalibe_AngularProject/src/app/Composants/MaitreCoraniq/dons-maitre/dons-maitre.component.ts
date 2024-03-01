import { Component } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  selector: 'app-dons-maitre',
  templateUrl: './dons-maitre.component.html',
  styleUrls: ['./dons-maitre.component.css']
})
export class DonsMaitreComponent {
  dons: any[] = []; // Initialisez comme un tableau vide


  constructor(private service: AllservicesService ) {}

  ngOnInit(): void {
    this. loadAllDons();
 }

 loadAllDons() {
  this.service.getWithToken('/mes-dons', (reponse: any) => {
    console.log('test', reponse);
    this.dons=reponse;
  });
}
}

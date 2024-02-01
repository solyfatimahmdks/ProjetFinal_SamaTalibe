import { Component, OnInit } from '@angular/core';
import { AllservicesService } from '../../../service/all-services-rest.service';


@Component({
  selector: 'app-dash-maitre',
  templateUrl: './dash-maitre.component.html',
  styleUrls: ['./dash-maitre.component.css']
})
export class DashMaitreComponent implements OnInit {

  dahraList: any[] = [];
  dahras: any;
  // Déclarez des propriétés pour stocker les valeurs des champs
  nomDahra: string = '';
  nomOustaz: string = '';
  numeroTelephone: string = '';
  numeroTelephoneOustaz: string= '';
  adresse: string = '';
  region: string = '';
  email: string = '';
  password: string = '';
  nombreTalibe: string = '';



  constructor(private allservicesService: AllservicesService) { }
  ngOnInit(): void {
    this.loadDahraList();
    this.onSubmit();
  }
   
  onSubmit() {
    // Créez un objet avec les données du formulaire
    const dataToSend = {
      nomDahra: this.nomDahra,
      nomOustaz: this.nomOustaz,
      numeroTelephone: this.numeroTelephone,
      numeroTelephoneOustaz: this.numeroTelephoneOustaz,
      adresse: this.adresse,
      region: this.region,
      email: this.email,
      password: this.password,
      nombreTalibe: this.nombreTalibe,

    };
    
    this.allservicesService.post('/register/dahra', dataToSend, (response: any) => {
       this.allservicesService = response; 
      this.allservicesService.message('Succès', 'success', 'Le Dahra a été ajouté avec succès.');
    });

}
loadDahraList() {
  this.allservicesService.get('/lister-dahra',(response: any) => {
      this.dahraList = response;

    },
   
  );
}

}

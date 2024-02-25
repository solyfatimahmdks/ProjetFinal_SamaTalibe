import { Component } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';
import { AuthService } from 'src/app/service/auth-service.service';


@Component({
  selector: 'app-dons-user',
  templateUrl: './dons-user.component.html',
  styleUrls: ['./dons-user.component.css']
})
export class DonsUserComponent {
  user: any; // Contiendra les informations de l'utilisateur connecté
  donneeDonation: any = {}; // Contiendra les données de la donation
  
  dahra_name: any;
  disponibiliteDon: any;
  descriptionDon: any;
  adresseProvenance: any;
  date: any;
  typeDon: any;

  don: any = {
    statut:'',
    disponibiliteDon:'',
    descriptionDon:'',
    adresseProvenance:'',
    date:'',
    dahra_name:'',
    typeDon:'',
  };
  


  constructor(private service: AllservicesService ) {
    // this.user = this.authService.getLoggedInUser(); 
  }

  faireDonation() {
    this.don = {
    disponibiliteDon: this.disponibiliteDon,
    descriptionDon: this.descriptionDon,
    adresseProvenance:this.adresseProvenance,
    date: this.date,
    dahra_name: this.dahra_name,
    typeDon: this.typeDon,
    }

    console.log(this.don)
    


   this.service.post('/faire-don' ,this.don, (reponse: any) => {
        console.log(reponse);
        
      });
    }
  
}

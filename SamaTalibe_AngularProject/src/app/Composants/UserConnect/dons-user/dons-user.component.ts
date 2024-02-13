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
  
  nom: any;
  disponibiliteDon: any;
  descriptionDon: any;
  adresseProvenance: any;
  date: any;
  statut: any;
  typeDon: any;

  don: any = {
    statut:'',
    disponibiliteDon:'',
    descriptionDon:'',
    adresseProvenance:'',
    date:'',
    nom:'',
    typeDon:'',
  };
  


  constructor(private service: AllservicesService ) {
    // this.user = this.authService.getLoggedInUser(); 
  }

  faireDonation() {
    this.don = {
    statut: this.statut,
    disponibiliteDon: this.disponibiliteDon,
    descriptionDon: this.descriptionDon,
    adresseProvenance:this.adresseProvenance,
    date: this.date,
    nom: this.nom,
    typeDon: this.typeDon,
    }

    console.log('nom:', this.nom);
    console.log('disponibiliteDon:', this.disponibiliteDon);
    console.log(' descriptionDon:', this.descriptionDon);
    console.log('adresseProvenance:', this.adresseProvenance);
    console.log('Date:', this.date);
    console.log('statut:', this.statut);
    console.log('typeDon:', this.typeDon);
    


   this.service.post('/faire-don' , {}, (reponse: any) => {
        console.log(reponse);
        // Une fois le rôle ajouté avec succès, vous pouvez recharger la liste des rôles
        this.faireDonation();
        
      });
    }
  
}

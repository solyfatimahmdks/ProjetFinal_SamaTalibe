import { Component } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  email: string = '';

  constructor(private service: AllservicesService) {}
  sAbonnerNewsletter() {
    const dataToSend = { email: this.email };

    // Utilisez votre service pour envoyer la demande d'abonnement
    this.service.post('/newsletter/souscription', dataToSend, (response: any) => {
      console.log(response); 
      // Réinitialisez le champ email après l'envoi
      this.email = '';
    });
  }
}

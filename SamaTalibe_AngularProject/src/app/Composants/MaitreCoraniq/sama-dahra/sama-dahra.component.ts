
import { Component, OnInit } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';


@Component({
  selector: 'app-sama-dahra',
  templateUrl: './sama-dahra.component.html',
  styleUrls: ['./sama-dahra.component.css']
})
// N'oubliez pas d'ajouter 'export' devant la classe
export class SamaDahraComponent {
  showListTalib = true;
  showListTalibArchiv = false;


  toggleView(view: string): void {
    this.showListTalib = view === 'listTalib';
    this.showListTalibArchiv = view === 'listTalibArchiv';
  }
  constructor(private service: AllservicesService) {}

  ajouterTalibe(nom: string, prenom: string, origine: string, situation: string, dateArrivee: string, description: string,): void {
    const dataToSend = {
      nom,
      prenom,
      origine,
      situation,
      dateArrivee,
      description
    };

       this.service.post('/dahra/add-talibe', dataToSend, (response: any) => {
      // Gérez la réponse ici
      console.log(response);
    });
  }

}

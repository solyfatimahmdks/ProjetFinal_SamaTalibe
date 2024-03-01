import { Component, OnInit } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  selector: 'app-parrains',
  templateUrl: './parrains.component.html',
  styleUrls: ['./parrains.component.css']
})
export class ParrainsComponent implements OnInit {
  // Attribut pour la pagination
  articlesParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle
  dataprofessions: any;
  parrainsParPage: any;

  parrains: any;

  constructor(private service: AllservicesService ) {}

  ngOnInit(): void {
    this. loadAllParrains();
 }

 loadAllParrains() {
  this.service.get('/lister_parrainage', (reponse: any) => {
    console.log('test', reponse);
    console.log(this.loadAllParrains);
    
    this.parrains=reponse;
  });
  this.parrainsParPage = this.getParrainsPage();
}
  

//pagination  
getParrainsPage(): any[] {
  const indexDebut = (this.pageActuelle - 1) * this.parrainsParPage;
  const indexFin = indexDebut + this.parrainsParPage;
  return this.dataprofessions.slice(indexDebut, indexFin);
}
   // Méthode pour générer la liste des pages
   get pages(): number[] {
    const totalPages = Math.ceil(this. dataprofessions.length / this.parrainsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this. dataprofessions.length / this.parrainsParPage);
  }
}

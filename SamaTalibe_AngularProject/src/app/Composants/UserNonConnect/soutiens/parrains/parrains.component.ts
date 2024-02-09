import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    // Initialisez vos données ici
    this.dataprofessions = [
      { 
        nom: 'Assane Ly',
        profession: 'Assistant de direction à la CNART',
        adresse: 'Kaolack',
        nombreParrainages: 8,
        email: 'assly@gmail.com',
        // Autres informations si nécessaire
      },
      { 
        nom: 'Assane Ly',
        profession: 'Assistant de direction à la CNART',
        adresse: 'Kaolack',
        nombreParrainages: 8,
        email: 'assly@gmail.com',
        // Autres informations si nécessaire
      },
      { 
        nom: 'Assane Ly',
        profession: 'Assistant de direction à la CNART',
        adresse: 'Kaolack',
        nombreParrainages: 8,
        email: 'assly@gmail.com',
        // Autres informations si nécessaire
      },
      { 
        nom: 'Assane Ly',
        profession: 'Assistant de direction à la CNART',
        adresse: 'Kaolack',
        nombreParrainages: 8,
        email: 'assly@gmail.com',
        // Autres informations si nécessaire
      },
      { 
        nom: 'Assane Ly',
        profession: 'Assistant de direction à la CNART',
        adresse: 'Kaolack',
        nombreParrainages: 8,
        email: 'assly@gmail.com',
        // Autres informations si nécessaire
      },
      { 
        nom: 'Assane Ly',
        profession: 'Assistant de direction à la CNART',
        adresse: 'Kaolack',
        nombreParrainages: 8,
        email: 'assly@gmail.com',
        // Autres informations si nécessaire
      },
      { 
        nom: 'Assane Ly',
        profession: 'Assistant de direction à la CNART',
        adresse: 'Kaolack',
        nombreParrainages: 8,
        email: 'assly@gmail.com',
        // Autres informations si nécessaire
      },
      { 
        nom: 'Assane Ly',
        profession: 'Assistant de direction à la CNART',
        adresse: 'Kaolack',
        nombreParrainages: 8,
        email: 'assly@gmail.com',
        // Autres informations si nécessaire
      },
      { 
        nom: 'Assane Ly',
        profession: 'Assistant de direction à la CNART',
        adresse: 'Kaolack',
        nombreParrainages: 8,
        email: 'assly@gmail.com',
        // Autres informations si nécessaire
      },
    ]; // Remplacez ... par vos données
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

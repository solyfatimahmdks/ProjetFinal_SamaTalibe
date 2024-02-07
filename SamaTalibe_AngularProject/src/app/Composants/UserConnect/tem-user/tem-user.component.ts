import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-tem-user',
  templateUrl: './tem-user.component.html',
  styleUrls: ['./tem-user.component.css']
})
export class TemUserComponent {
  nouveauTemoignage: string = ''; // Propriété pour stocker le nouveau témoignage
  temoignages: any[] = [
    { contenu: "Un témoignage", auteur: "ID_de_l'auteur_1" },
    { contenu: "Autre témoignage", auteur: "ID_de_l'auteur_2" },
    // ...
  ]; // 
  utilisateurConnecte: any;

constructor(private authService: AuthService) { } 

ngOnInit(): void {
  this.utilisateurConnecte = this.authService.getUser();
  this.filterTemoignages();
}

  envoyerTemoignage() {
    // Vérifiez si le champ de témoignage n'est pas vide
    if (this.nouveauTemoignage.trim() !== '') {
      // Ajoutez le nouveau témoignage au tableau des témoignages
      this.temoignages.push(this.nouveauTemoignage);
      
      // Réinitialisez le champ de témoignage
      this.nouveauTemoignage = '';

      // Enregistrez les témoignages dans le local storage si nécessaire
      localStorage.setItem('temoignages', JSON.stringify(this.temoignages));
    }
  }
  filterTemoignages() {
    this.temoignages = this.temoignages.filter(temoignage => {
      // Vérifiez si l'objet de témoignage a une propriété 'auteur' et comparez-la avec l'ID de l'utilisateur connecté
      return temoignage && temoignage.auteur && temoignage.auteur !== this.utilisateurConnecte.id;
    });
  }
}



import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

  nom: string = '';
  email: string = '';
  sujet: string = '';
  message: string = '';

  envoyerMessage() {
    const formData = {
      nom: this.nom,
      email: this.email,
      sujet: this.sujet,
      message: this.message
    };

      // Stockage des données dans le local storage
        localStorage.setItem('formData', JSON.stringify(formData));

          // Réinitialisation des valeurs des champs du formulaire
          this.nom = '';
          this.email = '';
          this.sujet = '';
          this.message = '';

        // Vous pouvez également rediriger l'utilisateur vers une page de confirmation
        console.log('Message enregistré localement :', formData);
      }
}

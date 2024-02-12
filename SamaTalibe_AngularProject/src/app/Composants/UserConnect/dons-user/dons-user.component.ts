import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';


@Component({
  selector: 'app-dons-user',
  templateUrl: './dons-user.component.html',
  styleUrls: ['./dons-user.component.css']
})
export class DonsUserComponent {
  user: any; // Contiendra les informations de l'utilisateur connecté

  constructor(private authService: AuthService) {
    this.user = this.authService.getLoggedInUser(); // Récupérer les informations de l'utilisateur connecté
  }
}

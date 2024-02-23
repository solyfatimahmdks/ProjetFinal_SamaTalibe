import { Component, OnInit } from '@angular/core';
// import { RoleService } from '../../../service/role-service.service'; // Mettez le chemin correct
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles-ad-sup.component.html',
  styleUrls: ['./roles-ad-sup.component.css'],
})
export class RolesAdSupComponent implements OnInit {
  roles:{[key:string]:string} = {};
  role: any;
  public:any;
  nomRole: string = '';
  users: any[] = [];

  constructor(private service: AllservicesService) {}

  ngOnInit(): void {
    this.loadRoles();
    this.loadUsers();
  }

  loadRoles() {
    this.service.get('/liste-roles', (reponse: any) => {
      console.log('test', reponse);
      this.roles=reponse.roles;
      console.log(this.roles);
      
    });
  }
  postRole() {
    if (this.nomRole.trim() !== '') { // Vérifie si le champ nomRole n'est pas vide
      let role = {
        nom: this.nomRole // Utilise la valeur de nomRole
      };
  
      this.service.post('/admin/assigner-role', role, (reponse: any) => {
        console.log('Role ajouté avec succès', reponse);
        // Une fois le rôle ajouté avec succès, vous pouvez recharger la liste des rôles
        this.loadRoles();
        // Réinitialise le champ nomRole après l'ajout du rôle
        this.nomRole = '';
      });
    } else {
      console.log('Le champ nom du rôle est vide.');
      // Gérez le cas où le champ nomRole est vide, vous pouvez afficher un message à l'utilisateur par exemple.
    }
  }
  
  loadUsers() {
    this.service.get('/liste-roles', (reponse: any) => {
      console.log(reponse);
     this.users = reponse;
     console.log(this.users);
     
    });
  }


}

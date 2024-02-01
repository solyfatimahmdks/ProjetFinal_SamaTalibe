import { Component, OnInit } from '@angular/core';
// import { RoleService } from '../../../service/role-service.service'; // Mettez le chemin correct
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles-ad-sup.component.html',
  styleUrls: ['./roles-ad-sup.component.css'],
})
export class RolesAdSupComponent implements OnInit {
  roles: any[] = [];
  role: any;
  public:any;

  constructor(private service: AllservicesService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.service.get('/roles', (reponse: any) => {
      console.log('test', reponse);
      this.roles=reponse;
    });
  }

  postRole() {
    let role = {
      nom: 'admin',
    };

    this.service.post('/sm2', role, (reponse: any) => {
      console.log('test', reponse);
    });
  }








}

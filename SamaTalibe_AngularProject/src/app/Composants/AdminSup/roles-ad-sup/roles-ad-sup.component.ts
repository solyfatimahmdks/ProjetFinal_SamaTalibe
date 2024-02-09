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
    // this.postRole();
  }

  loadRoles() {
    this.service.get('/liste-roles', (reponse: any) => {
      console.log('test', reponse);
      this.roles=reponse;
      console.log(this.roles);
      
    });
  }

  // postRole() {
  //   let role = {
  //     nom: 'admin',
  //   };

  //   this.service.post('/assigner-role', role, (reponse: any) => {
  //     console.log('test', reponse);
  //   });
  // }








}

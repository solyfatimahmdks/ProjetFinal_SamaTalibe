import { Injectable } from '@angular/core';
import { AllservicesService } from '../service/all-services-rest.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private allServices: AllservicesService) {}

  // Méthode pour récupérer la liste des rôles
  getRoles(onSuccess:Function) {
    return this.allServices.get('/roles', (response: any) => onSuccess(response));
  }
}

import { Injectable } from '@angular/core';
import { AllservicesService } from '../app/service/all-services-rest.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RoleService {
  constructor(
    private allServices: AllservicesService,
    private http: HttpClient
  ) {}

  // Méthode pour récupérer la liste des rôles
  getRoles(): Observable<any> {
    return this.http.get<any>('/roles');
  }

}


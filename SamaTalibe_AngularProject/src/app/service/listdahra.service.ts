import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TOKEN_KEY } from '../constants/constant';

@Injectable({
  providedIn: 'root',
})
export class DahraService {
  private apiUrl = 'http://127.0.0.1:8000/api'; //
  constructor(private http: HttpClient) {}


    getListOfDahras(onSuccess: Function) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN_KEY) ?? '{}').token,
        }),
      };
  
      this.http.get(this.apiUrl + 'endpoint_pour_liste_des_dahras', httpOptions)
        .subscribe((reponse: any) => onSuccess(reponse));
    }
  }
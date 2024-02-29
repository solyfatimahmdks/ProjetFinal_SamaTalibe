import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TOKEN_KEY } from '../constants/constant';

@Injectable({
  providedIn: 'root',
})
export class DahraService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getListOfDahras(onSuccess: Function) {
    const token = JSON.parse(localStorage.getItem(TOKEN_KEY) ?? '{}').token;
    let httpOptions = {};

    // Vérifiez si un token est disponible dans le stockage local
    if (token) {
      httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      };
    }

    // Utilisez les options HTTP lors de l'appel à l'API
    this.http.get(this.apiUrl + '/endpoint_pour_liste_des_dahras', httpOptions)
      .subscribe((response: any) => onSuccess(response));
  }
}

import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit{
  inscriptionDahra(userDahra: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://127.0.0.1:8000/api';  // URL de votre backend
 
  token: any;
  userConnect: any;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.userConnect=JSON.parse(localStorage.getItem('userOnline') || '')
   console.log(this.userConnect)
  }
  // login
   //service
   login(user: any, onSuccess: Function){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("userOnline")??'{}').token
      })
    };
    return this.http.post(`${this.apiUrl}/login`, user,httpOptions).subscribe((reponse: any) => onSuccess(reponse));
  }
  // connexion



  // sweetalert
  showMessage(icon:any, titre:any, texte:any){
    Swal.fire({
      icon: icon,
      title: titre,
      text: texte,
    })
}

  // inscription
  inscriptionDonateur(user: any): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: "Bearer " + JSON.parse(localStorage.getItem("userOnline")??'{}').token
    //   })
    // };
    return this.http.post<any>(`${this.apiUrl}/inscrire-donateur`, user);
  }
  
 
  // connexion
  signIn(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
  getToken(){
    
   return this.token
  }


}


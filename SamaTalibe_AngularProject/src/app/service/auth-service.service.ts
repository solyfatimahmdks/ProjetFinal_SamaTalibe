import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { TOKEN_KEY } from '../constants/constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit{

  currentUser: any;
  router: any;
  getUser(): any {
    return this.currentUser;
  }
  inscriptionDahra(userDahra: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register/dahra`, userDahra);
  }
  private apiUrl = 'http://127.0.0.1:8000/api';  // URL de votre backend
 
  token: any;
  userConnect: any;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.userConnect=JSON.parse(localStorage.getItem(TOKEN_KEY) || '')
   console.log(this.userConnect)
  }
  // login
   //service
   login(user: any, onSuccess: Function){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + JSON.parse(localStorage.getItem(TOKEN_KEY)??'{}').token
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
    return this.http.post<any>(`${this.apiUrl}/inscrire-donateur`, user);
  }

 
  // connexion
  signIn(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
  getToken(){
    
   return this.token
  }


  setLoggedInUser(user: any): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLoggedInUser(): any {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  }


  logout(): void {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }


} 

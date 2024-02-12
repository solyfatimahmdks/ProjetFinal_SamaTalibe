import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { TOKEN_KEY } from '../constants/constant';

@Injectable({
  providedIn: 'root',
})
export class AllservicesService implements OnInit {
  search(keyword: string) {
    throw new Error('Method not implemented.');
  }
  unlockAndActivateDahra(id: number, arg1: (response: any) => void) {
    throw new Error('Method not implemented.');
  }
 
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  post(path: string, dataToSend: any, onSuccess: Function) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem(TOKEN_KEY) ?? '{}').token,
      }),
    };
    this.http
      .post(this.apiUrl + path, dataToSend, httpOptions)
      .subscribe((reponse: any) => onSuccess(reponse));
  }
  simplePost(path: string, onSuccess: Function) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem(TOKEN_KEY) ?? '{}').token,
      }),
    };
    this.http
      .post(this.apiUrl + path, {}, httpOptions)
      .subscribe((reponse: any) => onSuccess(reponse));
  }

  get(path: string, onSuccess: Function) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem(TOKEN_KEY) ?? '{}').token,
      }),
    };
    this.http
      .get(this.apiUrl + path, httpOptions)
      .subscribe((reponse: any) => onSuccess(reponse));
  }

  put(path: string, dataToSend: any, onSuccess: Function) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem(TOKEN_KEY) ?? '{}').token,
      }),
    };
    this.http
      .put(this.apiUrl + path, dataToSend, httpOptions)
      .subscribe((response: any) => onSuccess(response));
  }

  delete(path: string, onSuccess: Function) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem(TOKEN_KEY) ?? '{}').token,
      }),
    };
    this.http
      .delete(this.apiUrl + path, httpOptions)
      .subscribe((response: any) => onSuccess(response));
  }

  message(title: any, icon: any, message: any) {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
    });
  }
  

  
}

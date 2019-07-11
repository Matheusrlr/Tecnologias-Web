import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './login/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(login: string, senha: string): Observable<User> {
    console.log("TTT",login,senha);
    return this.http.post<User>('http://localhost:5000/login', {
      login: login,
      senha: senha
    }, httpOptions);
  }
}

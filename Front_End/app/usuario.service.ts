import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuarios/usuario';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('http://localhost:5000/usuario');
  }

  atualizarUsuario(usuario: Usuario): Observable<any> {
    return this.http.put('http://localhost:5000/usuario/',usuario,httpOptions);
  }

  apagarUsuario(usuario: Usuario): Observable<any> {
    return this.http.delete('http://localhost:5000/usuario/'+ usuario.cpf);
  }

  adicionar(usuario: Usuario): Observable<any> {
    return this.http.post('http://localhost:5000/usuario', usuario, httpOptions);
  }
}

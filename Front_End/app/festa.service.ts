import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Festa } from './festas/festa';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FestaService {

  constructor(private http: HttpClient) { }

  getFesta(): Observable<Festa[]> {
    return this.http.get<Festa[]>('http://localhost:5000/festa');
  }

  atualizarFesta(festa: Festa): Observable<any> {
    return this.http.put('http://localhost:5000/festa/', festa, httpOptions);
  }

  apagarFesta(festa: Festa): Observable<any> {
    return this.http.delete('http://localhost:5000/festa/' + festa.nome);
  }

  adicionar(festa: Festa): Observable<any> {
    return this.http.post('http://localhost:5000/festa', festa, httpOptions);
  }
}

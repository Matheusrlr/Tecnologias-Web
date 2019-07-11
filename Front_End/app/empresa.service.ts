import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empresa } from './empresas/empresa';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getEmpresa(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>('http://localhost:5000/empresa');
  }

  atualizarEmpresa(empresa: Empresa): Observable<any> {
    return this.http.put('http://localhost:5000/empresa/', empresa, httpOptions);
  }

  apagarEmpresa(empresa: Empresa): Observable<any> {
    return this.http.delete('http://localhost:5000/empresa/' + empresa.cnpj);
  }

  adicionar(empresa: Empresa): Observable<any> {
    return this.http.post('http://localhost:5000/empresa', empresa, httpOptions);
  }
}

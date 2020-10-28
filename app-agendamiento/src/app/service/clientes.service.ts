import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cliente} from '../models/cliente';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  urlEndpoint = environment.apiUrl + 'cliente';

  constructor(private httpClient: HttpClient) {
  }

  findByRut(rutCliente: string): Observable<Cliente> {
    const url = this.urlEndpoint + `/find-by-rut?rutCliente=${rutCliente ? rutCliente : ''}`;
    return this.httpClient.get<Cliente>(url);
  }

}

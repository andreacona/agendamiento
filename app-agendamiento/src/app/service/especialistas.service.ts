import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reserva} from '../models/reserva';
import {Especialista} from '../models/especialista';

@Injectable({
  providedIn: 'root'
})
export class EspecialistasService {

  urlEndpoint = 'http://localhost:8080/' + 'especialista';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Especialista[]> {
    return this.httpClient.get<Especialista[]>(this.urlEndpoint + '/get-all');
  }


}

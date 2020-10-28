import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Especialista} from '../models/especialista';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecialistasService {

  urlEndpoint = environment.apiUrl + 'especialista';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Especialista[]> {
    return this.httpClient.get<Especialista[]>(this.urlEndpoint + '/get-all');
  }


}

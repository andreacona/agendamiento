import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Especialidad} from '../models/especialidad';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadService {

  urlEndpoint = environment.apiUrl + 'especialidad';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Especialidad[]> {
    return this.httpClient.get<Especialidad[]>(this.urlEndpoint + '/get-all');
  }
}

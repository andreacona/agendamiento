import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  urlEndpoint = environment.apiUrl + 'servicio';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.urlEndpoint + '/get-all');
  }

  getServiciosByEspecialista(idEspecialista: number): Observable<any> {
    const endPointGetByEspecialista =
      this.urlEndpoint +
      '/get-by-especialista?' +
      'idEspecialista=' + (idEspecialista ? idEspecialista : '');

    return this.httpClient.get(endPointGetByEspecialista);
  }

  getServiciosByEspecialidad(idEspecialidad: number): Observable<any> {

    const endPointGetByEspecialista =
      this.urlEndpoint +
      '/get-by-especialidad?' +
      'idEspecialidad=' + (idEspecialidad ? idEspecialidad : '');

    return this.httpClient.get(endPointGetByEspecialista);
  }
}

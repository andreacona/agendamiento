import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  urlEndpoint = 'http://localhost:8080/' + 'servicio';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(this.urlEndpoint + '/get-all');
  }

  getServiciosByEspecialista(idEspecialista: number): Observable<any> {
    let idEspecialistaParametro: string;

    if (idEspecialista !== null && idEspecialista != undefined) {
      idEspecialistaParametro = idEspecialista.toString();
    } else {
      idEspecialistaParametro = '';
    }
    const endPointGetByEspecialista =
      this.urlEndpoint +
      '/get-by-especialista?' +
      'idEspecialista=' +
      idEspecialistaParametro;

    return this.httpClient.get(endPointGetByEspecialista);
  }

  getServiciosByEspecialidad(idEspecialidad: number): Observable<any> {
    let idEspecialidadParametro: string;

    if (idEspecialidad !== null && idEspecialidad != undefined) {
      idEspecialidadParametro = idEspecialidad.toString();
    } else {
      idEspecialidadParametro = '';
    }

    const endPointGetByEspecialista =
      this.urlEndpoint +
      '/get-by-especialidad?' +
      'idEspecialidad=' +
      idEspecialidadParametro;

    return this.httpClient.get(endPointGetByEspecialista);
  }
}

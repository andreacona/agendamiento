import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reserva} from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  urlEndpoint = 'http://localhost:8080/' + 'reserva';

  constructor(private httpClient: HttpClient) {
  }

  getReservasByRutCliente(rutCliente: string): Observable<Reserva[]> {
    const url = this.urlEndpoint +
      `/get-by-rut-cliente?rutCliente=${rutCliente ? rutCliente : ''}`;
    return this.httpClient.get<Reserva[]>(url);
  }

  getReservasByEspecialistaAndFechas(idEspecialista: number,
                                     fechaDesde: string, fechaHasta: string): Observable<Reserva[]> {
    const url = this.urlEndpoint +
      `/get-by-especialista-and-fechas` +
      `?idEspecialista=${idEspecialista ? idEspecialista : ''}` +
      `&fechaDesde=${fechaDesde ? fechaDesde : ''}` +
      `&fechaHasta=${fechaHasta ? fechaHasta : ''}`;

    return this.httpClient.get<Reserva[]>(url);
  }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reserva} from '../models/reserva';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  urlEndpoint = environment.apiUrl + 'reserva';

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

  anularById(idReserva: number): Observable<{ mensaje: string }> {
    const url = this.urlEndpoint +
      `/anular-by-id` + `?idReserva=${idReserva}`;
    return this.httpClient.delete<{ mensaje: string }>(url);
  }

}

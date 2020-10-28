import {Injectable} from '@angular/core';
import {FiltrosCalendario} from '../models/filtros-calendario';
import {Observable} from 'rxjs';
import {ReservasCalendario} from '../models/reservas-calendario';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasCalendarioService {

  private urlEndpoint = environment.apiUrl + 'reservas-calendario';

  constructor(private httpClient: HttpClient) {
  }

  getReservasCalendarioByFilters(filtrosCalendario: FiltrosCalendario): Observable<ReservasCalendario[]> {
    const idLocal = filtrosCalendario.idLocal;
    const fechaSeleccionada = filtrosCalendario.fechaSeleccionada;
    const idEspecialista = filtrosCalendario.idEspecialista;
    const idEspecialidad = filtrosCalendario.idEspecialidad;
    const idServicio = filtrosCalendario.idServicio;
    const isServicioADomicilio = filtrosCalendario.isServicioADomicilio;

    const endpointGetByFilters = this.urlEndpoint + '/get-by-filters?' +
      `idLocal=${idLocal !== null && idLocal !== undefined ? idLocal : ''}` +
      `&fechaSeleccionada=${fechaSeleccionada ? fechaSeleccionada : ''}` +
      `&idEspecialista=${idEspecialista ? idEspecialista : ''}` +
      `&idEspecialidad=${idEspecialidad ? idEspecialidad : ''}` +
      `&idServicio=${idServicio ? idServicio : ''}` +
      `&isServicioADomicilio=${isServicioADomicilio ? isServicioADomicilio : false}`;

    return this.httpClient.get<ReservasCalendario[]>(endpointGetByFilters);

  }

}

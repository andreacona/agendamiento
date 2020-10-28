import {Box} from './box';
import {EventoCalendario} from './evento-calendario';

export class ReservasCalendario {
  box: Box;
  reservas: EventoCalendario[];
  horasBloqueadas: EventoCalendario[];
  horasDisponibles: string[];
}

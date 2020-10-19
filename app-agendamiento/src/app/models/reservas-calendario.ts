import {CalendarEvent} from 'angular-calendar';
import {Box} from './box';

export class ReservasCalendario {
  box: Box;
  reservas: CalendarEvent[];
  horasBloqueadas: CalendarEvent[];
  horasDisponibles: string[];
}

import {Cliente} from './cliente';
import {Especialista} from './especialista';
import {Servicio} from './servicio';
import {Convenio} from './convenio';
import {Box} from './box';

export class Reserva {

  idReserva: number;
  comentario: string;
  cliente: Cliente;
  especialista: Especialista;
  servicio: Servicio;
  idEstadoPago: number;
  convenio: Convenio;
  box: Box;
  diaReserva: string;
  horaReserva: string;
  status: string;
  deleted: boolean;
  consultaADomicilio: boolean;
  createDateTime: Date;
  updateDateTime: Date;
}

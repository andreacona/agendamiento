import {Especialidad} from './especialidad';
import {Convenio} from './convenio';

export class Especialista {

  idEspecialista: number;
  nombre: string;
  correo: string;
  telefono: number;
  nombreFoto: string;
  fechaNacimiento: Date;
  especialidad: Especialidad; // // especialidad: Especialidad ;
  convenios: Convenio[];
  idLocal: number;
  createDateTime: Date;
  updateDateTime: Date;

}

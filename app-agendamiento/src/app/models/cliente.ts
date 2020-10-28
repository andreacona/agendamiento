export class Cliente {
  rut: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  telefono: number;
  notificarWhatsappSMS: boolean; /* Por confirmar este campo */
  email: string;
  notificarCorreo: boolean; /* Por confirmar este campo */
  idTipoPrevision: number;
  createDateTime: Date;
  updateDateTime: Date;
}

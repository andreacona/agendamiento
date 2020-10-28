import {ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarWeekViewBeforeRenderEvent} from 'angular-calendar';

import * as moment from 'moment';
import {ReservasCalendario} from '../../models/reservas-calendario';
import {FiltrosCalendario} from '../../models/filtros-calendario';
import {ReservasCalendarioService} from '../../service/reservas-calendario.service';
import {EventoCalendario} from '../../models/evento-calendario';
import {ClientesService} from '../../service/clientes.service';
import {Reserva} from '../../models/reserva';
import {Cliente} from '../../models/cliente';
import {Utils} from '../../utils/utils';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  gray: {
    primary: '#C6C6C6',
    secondary: '#C6C6C6',
  }
};

@Component({
  selector: 'app-vista-diaria',
  templateUrl: './vista-diaria.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./vista-diaria.component.scss'],
})
export class VistaDiariaComponent {

  @ViewChild('modalResumen')
  modalResumen: TemplateRef<any>;

  @ViewChild('modalNuevaReserva')
  modalReservarCancelar: TemplateRef<any>;

  /** Tipo de vista, puede ser month, week o day, se cambia en el HTML (linea 81) */
  view = 'day';

  /** Fecha que se muestra en el calendario */
  viewDate: Date = new Date();

  /** Se utiliza para mostrar el detalle de el evento seleccionado */
  modalResumenData: EventoCalendario;


  /** Se utiliza para actualizar los eventos utilizando refresh.next() */
  refresh: Subject<any> = new Subject();

  citas: ReservasCalendario[] = [];

  /** Utilizado en la vista por mes para mostrar eventos de un dia seleccionado */
  activeDayIsOpen = false;

  horaDeInicio: number;
  styleCalendar: { textAlign: string, width?: string };
  rutCliente = '';

  reservaForm: Reserva;

  edadClienteForm: string;
  fechaReservaForm: string;

  showAlertRutNoEncontrado = false;

  constructor(private modal: NgbModal,
              private reservasCalendarioService: ReservasCalendarioService,
              private changeDetectorRef: ChangeDetectorRef,
              private clientesService: ClientesService,
              private utils: Utils) {
    this.horaDeInicio = 8;
    this.styleCalendar = {textAlign: 'center'};

    this.reservaForm = new Reserva();
    this.reservaForm.cliente = new Cliente();


  }

  ngOnInit(): void {
    // this.cargarCitas();
  }


  /** Se ejecuta al clickear en una hora utilizado en vista semanal y diaria */
  hourClicked(boxId: number, fechaSeleccionada: Date, event: { date: Date, sourceEvent: MouseEvent }): void {
    const horaSeleccionadaDisponible: boolean = this.isHoraDisponible(event);
    if (horaSeleccionadaDisponible) {

      const fechaSeleccionadaMoment = moment(fechaSeleccionada);

      this.fechaReservaForm = fechaSeleccionadaMoment.format('DD-MM-YYYY');
      this.reservaForm.diaReserva = fechaSeleccionadaMoment.format('YYYY-MM-DD');

      this.reservaForm.horaReserva = fechaSeleccionadaMoment.format('HH:mm');

      this.modal.open(this.modalReservarCancelar, {
        size: 'reservar-cancelar',
      });
    }
  }


  /** Metodo llamado al momento de hacer click en un evento */
  handleEvent(citaClickeada: EventoCalendario, eventHTML): void {

    /** Si la cita esta disponible se muestra la carta de información */
    if (citaClickeada.meta.isEventoReserva) {

      /* TODO: mover tarjeta a posicion de mouse */
      const mouseEvent = (eventHTML.sourceEvent as MouseEvent);

      const mouseX = mouseEvent.screenX;
      const mouseY = mouseEvent.screenY;


      this.modalResumenData = citaClickeada;
      const horaSeleccionadaDisponible: boolean = this.isHoraDisponible(eventHTML);

      this.modal.open(this.modalResumen, {size: 'resumen-reserva'});

      setTimeout(() => {
        const modalElement = document.getElementsByClassName('modal-dialog modal-resumen-reserva')[0] as HTMLElement;


        const selecto = document.querySelector('.modal-dialog');
        const select2 = (mouseEvent.srcElement as Element).getBoundingClientRect();

        modalElement.style.left = (mouseX - select2.x) + 'px';
        modalElement.style.top = (mouseY - select2.y) + 'px';

      }, 200);

    }
  }

  cargarCitas({...filtros}: FiltrosCalendario): void {
    if (filtros.idEspecialidad === 0) {
      filtros.idEspecialidad = null;
    }
    if (filtros.idEspecialista === 0) {
      filtros.idEspecialista = null;
    }
    this.citas = [];
    this.reservasCalendarioService.getReservasCalendarioByFilters(filtros).subscribe(
      reservasCalendario => {

        this.styleCalendar = {width: +100 / reservasCalendario.length + '%', textAlign: 'center'};

        for (const reservaCalendario of reservasCalendario) {
          for (const reserva of reservaCalendario.reservas) {
            /* convertir las fechas en tipo Date (son recibidas como string) */
            reserva.start = new Date(reserva.start);
            reserva.end = new Date(reserva.end);
          }
        }

        this.citas = reservasCalendario;

        this.changeDetectorRef.detectChanges();

      }
    );
  }

  /**
   * @description Definir clase de las horas
   * @param horasDisponibles formato 'hh:mm:ss'
   * @param eventosHorasBloqueadas cada bloqueo tiene hora de inicio y de fin
   * @param renderEvent lista de horas del calendario, es enviada por la libreria
   */
  bloquearHorasEnCalendario(renderEvent: CalendarWeekViewBeforeRenderEvent, eventosHorasBloqueadas: EventoCalendario[],
                            horasDisponibles: string[]): void {
    const bloqueosIngresados = eventosHorasBloqueadas && eventosHorasBloqueadas.length > 0;
    const disponibilidadesIngresadas = horasDisponibles && horasDisponibles.length > 0;

    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {

          /* Validar si la hora esta bloqueada */
          const segmentDate = segment.date;

          if (bloqueosIngresados) {

            const eventosFiltrados = eventosHorasBloqueadas.filter(
              eventoHoraBloqueada => {
                const start = new Date(eventoHoraBloqueada.start);
                const end = new Date(eventoHoraBloqueada.end);
                return segmentDate >= start && segmentDate < end;
              }
            );

            if (eventosFiltrados.length > 0) {
              segment.cssClass = 'hora-bloqueada';
              return;
            }
          }

          /* Validar si la hora esta disponible */
          if (disponibilidadesIngresadas) {
            const segmentTime = moment(segmentDate).format('HH:mm:ss');
            const eventosFiltrados = horasDisponibles.filter(
              horaDisponible => horaDisponible === segmentTime
            );

            if (eventosFiltrados.length > 0) {
              segment.cssClass = 'hora-disponible';
            }

          }
        });
      });
    });
  }

  private isHoraDisponible(event: { date: Date, sourceEvent: MouseEvent }): boolean {
    const indexClassHoraDisponible = (event.sourceEvent.target as Element).className.indexOf('hora-disponible');
    return indexClassHoraDisponible !== -1;
  }

  abrirModalReservaHora(): void {
  }


  /**
   * @description al cambiar un filtro se actualizan las citas
   * en caso de que cambie la fecha seleccionada debe cambiarse la fecha del calendario
   */
  filterChanged(filtros: FiltrosCalendario): void {
    this.viewDate = moment(filtros.fechaSeleccionada).toDate();
    this.cargarCitas(filtros);

  }


  findClienteByRut(rutCliente: string): void {
    this.clientesService.findByRut(rutCliente).subscribe(
      response => {
        if (response) {
          this.reservaForm.cliente = response;
          this.calcularEdadCliente(response.fechaNacimiento);
        } else {
          this.showAlertRutNoEncontrado = true;
        }
      }
    );
  }

  calcularEdadCliente(fechaNacimiento): void {
    this.edadClienteForm = this.utils.calcularEdadString(fechaNacimiento);
  }

}

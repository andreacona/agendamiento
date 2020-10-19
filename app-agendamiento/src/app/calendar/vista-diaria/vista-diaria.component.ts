import {ChangeDetectionStrategy, Component, TemplateRef, ViewChild} from '@angular/core';
import {isSameDay, isSameMonth,} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarWeekViewBeforeRenderEvent} from 'angular-calendar';

import * as moment from 'moment';
import {ReservasCalendario} from '../../models/reservas-calendario';
import {FiltrosCalendario} from '../../models/filtros-calendario';
import {ReservasCalendarioService} from '../../service/reservas-calendario.service';

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

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('modalReservarCancelar') modalReservarCancelar: TemplateRef<any>;

  /** Tipo de vista, puede ser month, week o day, se cambia en el HTML (linea 81) */
  view = 'day';

  /** Fecha que se muestra en el calendario */
  viewDate: Date = new Date();

  /** Se utiliza para mostrar el detalle de el evento seleccionado */
  modalData: {
    event: CalendarEvent;
  };

  /** Se utiliza para actualizar los eventos utilizando refresh.next() */
  refresh: Subject<any> = new Subject();

  citas: ReservasCalendario[] = [];

  /** Utilizado en la vista por mes para mostrar eventos de un dia seleccionado */
  activeDayIsOpen = false;

  horaDeInicio: number;

  constructor(private modal: NgbModal,
              private reservasCalendarioService: ReservasCalendarioService) {
    this.horaDeInicio = 8;
  }

  ngOnInit(): void {
    // this.cargarCitas();
  }

  /** Al clickear un dia en la vista del mes */
  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  /** Se ejecuta al clickear en una hora utilizado en vista semanal y diaria */
  hourClicked(boxId: number, fechaSeleccionada: Date, event: { date: Date, sourceEvent: MouseEvent }): void {
    const horaSeleccionadaDisponible: boolean = this.horaEstaDisponible(event);
    if (horaSeleccionadaDisponible) {
      this.modal.open(this.modalReservarCancelar, {
        size: 'reservar-cancelar',
      });
    }
  }


  /** Se llama al editar, eliminar, arrastrar o cambiar tamaño de algun evento */
  handleEvent(citaClickeada: CalendarEvent, eventHTML): void {
    const mouseX = (eventHTML.sourceEvent as MouseEvent).pageX;
    const mouseY = (eventHTML.sourceEvent as MouseEvent).pageY;
    this.modalData = {event: citaClickeada};
    const horaSeleccionadaDisponible: boolean = this.horaEstaDisponible(eventHTML);

    if (citaClickeada.meta.isEventoReserva) {
      this.modal.open(this.modalContent, {size: 'lg'});
    }
  }

  cargarCitas(filtros: FiltrosCalendario): void {
    this.citas = [];
    this.reservasCalendarioService.getReservasCalendarioByFilters(filtros).subscribe(
      reservasCalendario => {
        for (const reservaCalendario of reservasCalendario) {
          for (const reserva of reservaCalendario.reservas) {
            reserva.start = new Date(reserva.start);
            reserva.end = new Date(reserva.end);
          }
        }

        this.citas = reservasCalendario;
        console.log(this.citas);
        console.log(this.citas.length);
        this.refresh.next();

      }
    );
  }


  bloquearHorasEnCalendario(renderEvent: CalendarWeekViewBeforeRenderEvent, eventosHorasBloqueadas: CalendarEvent[],
                            horasDisponibles: string[]): void {

    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {

          const segmentDate = segment.date;
          /* BUSCAR HORAS BLOQUEADAS */
          if (eventosHorasBloqueadas && eventosHorasBloqueadas.filter(
            eventoHoraBloqueada => segmentDate >= eventoHoraBloqueada.start && segmentDate < eventoHoraBloqueada.end
          ).length > 0) {
            segment.cssClass = 'hora-bloqueada';
          }

          const horaMinutos = moment(segment.date).format('HH:mm:00').toString();
          /* BUSCAR HORAS DISPONIBLES */
          if (
            horasDisponibles &&
            horasDisponibles.filter((hra) => hra === horaMinutos).length > 0
          ) {
            segment.cssClass = 'hora-disponible';
          }
        });
      });
    });
  }

  private horaEstaDisponible(event: { date: Date, sourceEvent: MouseEvent }): boolean {
    const indexClassHoraDisponible = (event.sourceEvent.target as Element).className.indexOf('hora-disponible');
    return indexClassHoraDisponible !== -1;
  }

  abrirModalReservaHora(): void {
    console.log('Acaa');
  }

  filterChanged(filtros: FiltrosCalendario): void {
    console.log('aqui');
    this.viewDate = moment(filtros.fechaSeleccionada).toDate();
    console.log(this.viewDate);
    this.cargarCitas(filtros);

    // console.log(fechaSeleccionada);
    // this.viewDate = fechaSeleccionada;
  }
}

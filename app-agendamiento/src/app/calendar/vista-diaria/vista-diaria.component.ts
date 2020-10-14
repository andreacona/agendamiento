import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
} from 'angular-calendar';

import * as moment from 'moment';

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

  /** Eventos */
  events: CalendarEvent[] = [
    {
      start: moment('2020-09-09 08:00:00').toDate(),
      end: moment('2020-09-09 08:45:00').toDate(),
      title: 'Control mensual - Juan Lopez',
      color: colors.red,
      meta: {
        profesional: 'Freddy Torres Jimenez',
        cliente: 'Juan Lopez',
        especialidadProfesiona: 'Dermatología',
        box: 1,
        tipoDeCita: 'Control mensual',
      },
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
    },
    {
      // start: addHours(startOfDay(new Date()), 2),
      // end: new Date(),
      start: moment('2020-09-08 08:45:00').toDate(),
      end: moment('2020-09-08 09:15:00').toDate(),
      title: 'Examen de sangre - Elizabeth Vergara',
      color: colors.yellow,
      resizable: {
        beforeStart: true,
        afterEnd: false,
      },
      draggable: true,
      meta: {
        profesional: 'Yolanda Sepulveda Cortez',
        cliente: 'Elizabeth Vergara',
        especialidadProfesiona: 'Dermatología',
        box: 1,
        tipoDeCita: 'Control mensual',
      },
    },
  ];

  citas: {
    box: { id: number; nombre: string };
    events: CalendarEvent[];
    horasBloqueadas?: CalendarEvent[];
    horasDisponibles?: string[]
  }[] = [];

  /** Utilizado en la vista por mes para mostrar eventos de un dia seleccionado */
  activeDayIsOpen = false;

  horaDeInicio: number;
  saludo: string;

  constructor(private modal: NgbModal) {
    this.horaDeInicio = 8;
  }

  ngOnInit(): void {
    this.cargarCitas();
  }

  /** Al clickear un dia en la vista del mes */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    });
    this.refresh.next();
  }

  actualizarEnventosEnCalendario(): void {
    this.refresh.next();
  }

  cargarCitas(): void {
    this.citas = [
      {
        box: { id: 1, nombre: 'Box 1' },
        events: [
          {
            start: moment('2020-10-09 10:00:00').toDate(),
            end: moment('2020-10-09 10:45:00').toDate(),
            title: 'Control mensual - Juan Lopez',
            color: colors.red,
            meta: {
              profesional: 'Freddy Torres Jimenez',
              cliente: 'Juan Lopez',
              especialidadProfesiona: 'Dermatología',
              box: 1,
              tipoDeCita: 'Control mensual',
              isEventoReserva: true
            },
          },
          {
            title: 'Control mensual - Juan Lopez',
            start: moment('2020-10-09 10:00:00').toDate(),
            end: moment('2020-10-09 10:45:00').toDate(),
            color: colors.gray,
            meta: {
              isEventoReserva: false
            }
          }
        ],
        horasBloqueadas: [
          {
            title: 'Control mensual - Juan Lopez',
            start: moment('2020-10-09 10:00:00').toDate(),
            end: moment('2020-10-09 10:45:00').toDate(),
            meta: {
              isEventoReserva: false
            }
          }],
        horasDisponibles: ['08:00', '08:15', '08:30', '08:45', '09:00']
      },
      {
        box: { id: 2, nombre: 'Box 2' },
        events: [
          {
            start: moment('2020-09-24 09:00:00').toDate(),
            end: moment('2020-09-24 09:30:00').toDate(),
            title: 'Control - Pedro Lopez',
            color: colors.red,
            meta: {
              profesional: 'Freddy Torres Jimenez',
              cliente: 'Juan Lopez',
              especialidadProfesiona: 'Dermatología',
              box: 1,
              tipoDeCita: 'Control mensual',
              isEventoReserva: true
            },
          },
        ],
        horasBloqueadas: [{
          title: 'Control mensual - Juan Lopez',
          start: moment('2020-10-05 10:00:00').toDate(),
          end: moment('2020-10-05 10:45:00').toDate()
        }],
        horasDisponibles: ['8:0', '9:0']
      },
      {
        box: { id: 3, nombre: 'Box 3' },
        events: [
          {
            start: moment('2020-09-24 09:00:00').toDate(),
            end: moment('2020-09-24 09:30:00').toDate(),
            title: 'Control - Pedro Lopez',
            color: colors.red,
            meta: {
              profesional: 'Freddy Torres Jimenez',
              cliente: 'Juan Lopez',
              especialidadProfesiona: 'Dermatología',
              box: 1,
              tipoDeCita: 'Control mensual',
            },
          },
        ],
      },
      {
        box: { id: 4, nombre: 'Box 4' },
        events: [
          {
            start: moment('2020-09-24 09:00:00').toDate(),
            end: moment('2020-09-24 09:30:00').toDate(),
            title: 'Control - Pedro Lopez',
            color: colors.red,
            meta: {
              profesional: 'Freddy Torres Jimenez',
              cliente: 'Juan Lopez',
              especialidadProfesiona: 'Dermatología',
              box: 1,
              tipoDeCita: 'Control mensual',
            },
          },
        ],
        // horasBloqueadas: [8, 9, 10]
      },
      {
        box: { id: 5, nombre: 'Box 5' },
        events: [
          {
            start: moment('2020-09-24 10:00:00').toDate(),
            end: moment('2020-09-24 12:30:00').toDate(),
            title: 'Control - Pedro Lopez',
            color: colors.red,
            meta: {
              profesional: 'Freddy Torres Jimenez',
              cliente: 'Juan Lopez',
              especialidadProfesiona: 'Dermatología',
              box: 1,
              tipoDeCita: 'Control mensual',
            },
          },
        ],
      },
    ];
  }


  bloquearHorasEnCalendario(renderEvent: CalendarWeekViewBeforeRenderEvent, eventosHorasBloqueadas: CalendarEvent[],
                            horasDisponibles: string[]): void {

    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {

          const segmentDate = segment.date;
          /* BUSCAR HORAS BLOQUEADAS */
          if (eventosHorasBloqueadas && eventosHorasBloqueadas.filter(
            eventoHoraBloqueada =>
              segmentDate >= eventoHoraBloqueada.start && segmentDate < eventoHoraBloqueada.end
          ).length > 0) {
            segment.cssClass = 'hora-bloqueada';
          }

          const horaMinutos = moment(segment.date).format('HH:mm').toString();
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

  private horaEstaDisponible(event: {
    date: Date;
    sourceEvent: MouseEvent;
  }): boolean {
    return (
      (event.sourceEvent.target as Element).className.indexOf(
        'hora-disponible'
      ) !== -1
    );
  }

  abrirModalReservaHora() {
    console.log('Acaa');
  }

  getDateFromFiltrosBusqueda(fechaSeleccionada: Date) {
    console.log('aqui');
    console.log(fechaSeleccionada);
    this.viewDate = fechaSeleccionada;
  }
}

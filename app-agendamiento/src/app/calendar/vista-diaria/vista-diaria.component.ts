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
} from 'angular-calendar';
import * as moment from 'moment';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#F4C004',
    secondary: '#F4C004',
  },
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
    action: string;
    event: CalendarEvent;
  };

  /** Se utiliza para actualizar los eventos utilizando refresh.next() */
  refresh: Subject<any> = new Subject();

  /** Eventos */
  events: CalendarEvent[] = [
    {
      start: moment('2020-09-08 08:00:00').toDate(),
      end: moment('2020-09-08 08:45:00').toDate(),
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
  }[] = [];
  // = [
  //   {
  //     box: { id: 1, nombre: 'Box 1' },
  //     events: [
  //       {
  //         start: moment('2020-09-24 08:00:00').toDate(),
  //         end: moment('2020-09-24 08:45:00').toDate(),
  //         title: 'Control mensual - Juan Lopez',
  //         color: colors.red,
  //         meta: {
  //           profesional: 'Freddy Torres Jimenez',
  //           cliente: 'Juan Lopez',
  //           especialidadProfesiona: 'Dermatología',
  //           box: 1,
  //           tipoDeCita: 'Control mensual',
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     box: { id: 2, nombre: 'Box 2' },
  //     events: [
  //       {
  //         start: moment('2020-09-24 09:00:00').toDate(),
  //         end: moment('2020-09-24 09:30:00').toDate(),
  //         title: 'Control - Pedro Lopez',
  //         color: colors.red,
  //         meta: {
  //           profesional: 'Freddy Torres Jimenez',
  //           cliente: 'Juan Lopez',
  //           especialidadProfesiona: 'Dermatología',
  //           box: 1,
  //           tipoDeCita: 'Control mensual',
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     box: { id: 3, nombre: 'Box 3' },
  //     events: [
  //       {
  //         start: moment('2020-09-24 09:00:00').toDate(),
  //         end: moment('2020-09-24 09:30:00').toDate(),
  //         title: 'Control - Pedro Lopez',
  //         color: colors.red,
  //         meta: {
  //           profesional: 'Freddy Torres Jimenez',
  //           cliente: 'Juan Lopez',
  //           especialidadProfesiona: 'Dermatología',
  //           box: 1,
  //           tipoDeCita: 'Control mensual',
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     box: { id: 4, nombre: 'Box 4' },
  //     events: [
  //       {
  //         start: moment('2020-09-24 09:00:00').toDate(),
  //         end: moment('2020-09-24 09:30:00').toDate(),
  //         title: 'Control - Pedro Lopez',
  //         color: colors.red,
  //         meta: {
  //           profesional: 'Freddy Torres Jimenez',
  //           cliente: 'Juan Lopez',
  //           especialidadProfesiona: 'Dermatología',
  //           box: 1,
  //           tipoDeCita: 'Control mensual',
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     box: { id: 5, nombre: 'Box 5' },
  //     events: [
  //       {
  //         start: moment('2020-09-24 10:00:00').toDate(),
  //         end: moment('2020-09-24 12:30:00').toDate(),
  //         title: 'Control - Pedro Lopez',
  //         color: colors.red,
  //         meta: {
  //           profesional: 'Freddy Torres Jimenez',
  //           cliente: 'Juan Lopez',
  //           especialidadProfesiona: 'Dermatología',
  //           box: 1,
  //           tipoDeCita: 'Control mensual',
  //         },
  //       },
  //     ],
  //   },
  // ];

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
    console.log(date);
    console.log(events);
  }

  /** Se ejecuta al clickear en una hora utilizado en vista semanal y diaria */
  hourClicked(boxId: number, fechaSeleccionada: Date): void {
    console.log('===============');
    console.log('Box:' + boxId);
    console.log(fechaSeleccionada);
    console.log('===============');

    this.modal.open(this.modalReservarCancelar, { size: 'reservar-cancelar' });
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event, null);
    this.refresh.next();
  }

  /** Se llama al editar, eliminar, arrastrar o cambiar tamaño de algun evento */
  handleEvent(action: string, event: CalendarEvent, ev): void {
    const mouseX = (ev.sourceEvent as MouseEvent).pageX;
    const mouseY = (ev.sourceEvent as MouseEvent).pageY;
    console.log(mouseX);
    console.log(mouseY);
    this.modalData = { event, action };

    if (action !== 'Dropped or resized') {
      this.modal.open(this.modalContent, { size: 'lg' });
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

  actualizarEnventosEnCalendario() {
    this.refresh.next();
  }

  cargarCitas() {
    this.citas = [
      {
        box: { id: 1, nombre: 'Box 1' },
        events: [
          {
            start: moment('2020-10-05 10:00:00').toDate(),
            end: moment('2020-10-05 10:45:00').toDate(),
            title: 'Control mensual - Juan Lopez',
            color: colors.yellow,
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
            },
          },
        ],
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
}

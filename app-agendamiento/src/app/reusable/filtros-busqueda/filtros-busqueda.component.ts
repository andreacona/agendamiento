import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
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
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-filtros-busqueda',
  templateUrl: './filtros-busqueda.component.html',
  styleUrls: ['./filtros-busqueda.component.scss'],
})
export class FiltrosBusquedaComponent implements OnInit {
  especialistas: any[] = [
    {
      id: 1,
      nombre: 'Claudia Contreras Ortega',
      profesion: [{ nombre: 'Obstetricia', id: 1 }],
    },
    {
      id: 2,
      nombre: 'Constanza Domingues Pino',
      profesion: [{ nombre: 'Nutricion', id: 2 }],
    },
    {
      id: 3,
      nombre: 'Freddy Torres Jimenez',
      profesion: [{ nombre: 'Medicina General', id: 3 }],
    },
    {
      id: 4,
      nombre: 'Giselle Gacitua Canales',
      profesion: [{ nombre: 'Fonoaudiologia', id: 4 }],
    },
    {
      id: 5,
      nombre: 'Jael Vera Mora',
      profesion: [{ nombre: 'Terapia Ocupacional', id: 5 }],
    },
    {
      id: 6,
      nombre: 'Saray Salinas Sepulveda',
      profesion: [{ nombre: 'Psicología integral', id: 6 }],
    },
    {
      id: 7,
      nombre: 'Yolanda Sepulveda Cortez',
      profesion: [{ tipoProfesion: 'kinesiologia', id: 7 }],
    },
  ];

  servicios: any[] = [
    {
      servicio1: 'primera consulta',
    },
    {
      servicio2: 'tratamiento medico',
    },
  ];

  especialidades: any[] = [
    {
      id: 1,
      nombre: 'kinesiología',
    },
    {
      id: 2,
      nombre: 'fonoaudiología',
    },
    {
      id: 3,
      nombre: 'Medicina General',
    },
    {
      id: 4,
      nombre: 'Nutrición',
    },
    {
      id: 5,
      nombre: 'Psicología',
    },
    {
      id: 6,
      nombre: 'Terapia Ocupacional',
    },
    {
      id: 7,
      nombre: 'Obstetricia',
    },
  ];

  valueButton = 'filtroNombre';
  valueProfesion = 'especialista.id';
  professions = [];

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: 'E',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: 'D',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      cssClass: null,
      id: null,
      meta: null,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      meta: {
        nombrePaciente: 'Juanito',
        nombreEspecialista: 'Yolanda',
      },
    },
  ];

  // activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) {}

  ngOnInit(): void {}

  changeValueButton(value: string) {
    this.valueButton = value;
  }

  changeValueProfesion(value: number) {
    this.professions = this.especialistas[value].profesion;
    console.log(this.professions);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  /* SE LLAMA AL HACER CLICK EN EVENTO*/
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
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
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  // setView(view: CalendarView) {
  //   this.view = view;
  // }

  // closeOpenMonthViewDay() {
  //   this.activeDayIsOpen = false;
  // }

  /**SE llama al clickear una hora en dia sin evento */
  hourClicked(fechaClickeada: Date) {
    console.log(fechaClickeada);
  }

  actualizarEnventosEnCalendario() {
    this.refresh.next();
  }
}

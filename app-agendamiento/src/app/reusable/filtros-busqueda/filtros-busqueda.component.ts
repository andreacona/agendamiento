import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EspecialistasService} from '../../service/especialistas.service';
import {EspecialidadService} from '../../service/especialidad.service';
import {ServiciosService} from '../../service/servicios.service';
import {Especialista} from '../../models/especialista';
import {Servicio} from '../../models/servicio';
import {Especialidad} from '../../models/especialidad';
import {FiltrosCalendario} from '../../models/filtros-calendario';
import * as moment from 'moment';
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';

@Component({
  selector: 'app-filtros-busqueda',
  templateUrl: './filtros-busqueda.component.html',
  styleUrls: ['./filtros-busqueda.component.scss'],
})
export class FiltrosBusquedaComponent implements OnInit {

  especialistas: Especialista[];

  serviciosEspecialista: Servicio[];
  serviciosEspecialidad: Servicio[];

  especialidades: Especialidad[];

  @Output()
  changeFiltersValues = new EventEmitter<FiltrosCalendario>();

  filtrosCalendario: FiltrosCalendario;

  valueButton = 'filtroNombre';

  selectedDate: Date = new Date();

  // activeDayIsOpen: boolean = true;

  constructor(
    private especialistasService: EspecialistasService,
    private especialidadesService: EspecialidadService,
    private servicioService: ServiciosService
  ) {
    this.filtrosCalendario = new FiltrosCalendario();
    this.filtrosCalendario.idLocal = 1;
    this.selectedDate = new Date();
    this.filtrosCalendario.fechaSeleccionada = moment(this.selectedDate).format('YYYY-MM-DD');

  }

  ngOnInit(): void {
    this.getAllEspecialistas();
    this.getAllEspecialidades();
    this.limpiarFiltros();
  }

  limpiarFiltros(): void {
    this.filtrosCalendario.isServicioADomicilio = false;
    this.filtrosCalendario.idServicio = null;
    this.filtrosCalendario.idEspecialista = null;
    this.filtrosCalendario.idEspecialidad = null;
  }

  changeValueButton(value: string): void {
    this.valueButton = value;
    this.limpiarFiltros();
  }

  changeValueEspecialista(idEspecialista: number): void {
    if (idEspecialista) {
      this.filtrosCalendario.idEspecialista = idEspecialista;
    }
    this.filtrosCalendario.idServicio = null;
    this.emitChanges();
    this.getServiciosByEspecialista(idEspecialista);
  }

  changeValueEspecialidad(idEspecialidad: number): void {
    if (idEspecialidad) {
      this.filtrosCalendario.idEspecialidad = idEspecialidad;
    }
    this.filtrosCalendario.idServicio = null;

    this.emitChanges();
    this.getServiciosByEspecialidad(idEspecialidad);
  }

  changeValueServicio(idServicio: number): void {
    this.filtrosCalendario.idServicio = idServicio;
    this.emitChanges();
    this.getServiciosByEspecialidad(idServicio);
  }

  changeValueFechaSeleccionada(fechaSeleccionada: Date): void {
    this.selectedDate = fechaSeleccionada;
    this.filtrosCalendario.fechaSeleccionada = moment(fechaSeleccionada).format('YYYY-MM-DD');
    this.emitChanges();

  }

  emitChanges(): void {
    this.changeFiltersValues.emit(this.filtrosCalendario);
  }

  getAllEspecialistas(): void {
    this.especialistasService.getAll().subscribe(
      (especialistas) => {
        this.especialistas = especialistas;
      },
      (error) => {
        /* TODO: */
        console.error(error);
      }
    );
  }

  getAllEspecialidades(): void {
    this.especialidadesService.getAll().subscribe(
      (especialidades) => {
        this.especialidades = especialidades;
      },
      (error) => {
        /* TODO: */
        console.error(error);
      }
    );
  }

  getServiciosByEspecialista(idEspecialista: number): void {
    this.servicioService
      .getServiciosByEspecialista(idEspecialista)
      .subscribe((servicios) => {
        this.serviciosEspecialista = servicios;
      }, err => {
        /* TODO: */

      });
  }


  getServiciosByEspecialidad(idEspecialidad: number): void {
    this.servicioService
      .getServiciosByEspecialidad(idEspecialidad)
      .subscribe((servicios) => {
        this.serviciosEspecialidad = servicios;
        console.log(servicios);
      }, err => {
        /* TODO: */

      });
  }


  dateClass(): MatCalendarCellCssClasses {
    return (date: Date): MatCalendarCellCssClasses => {
      return 'special-date';
    };
  }

  changeTipoDomicilio(event: boolean): void {
    this.filtrosCalendario.isServicioADomicilio = event;
    this.emitChanges();
  }
}

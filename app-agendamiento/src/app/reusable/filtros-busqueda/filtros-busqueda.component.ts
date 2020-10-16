import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EspecialistasService } from '../../service/especialistas.service';
import { EspecialidadService } from '../../service/especialidad.service';
import { ServiciosService } from '../../service/servicios.service';
import { Especialista } from '../../models/especialista';
import { Servicio } from '../../models/servicio';
import { Especialidad } from '../../models/especialidad';

@Component({
  selector: 'app-filtros-busqueda',
  templateUrl: './filtros-busqueda.component.html',
  styleUrls: ['./filtros-busqueda.component.scss'],
})
export class FiltrosBusquedaComponent implements OnInit {
  // especialistas: any[] = [
  //   {
  //     id: 1,
  //     nombre: 'Claudia Contreras Ortega',
  //     profesion: [{ nombre: 'Obstetricia', id: 1 }],
  //   },
  //   {
  //     id: 2,
  //     nombre: 'Constanza Domingues Pino',
  //     profesion: [{ nombre: 'Nutricion', id: 2 }],
  //   },
  //   {
  //     id: 3,
  //     nombre: 'Freddy Torres Jimenez',
  //     profesion: [{ nombre: 'Medicina General', id: 3 }],
  //   },
  //   {
  //     id: 4,
  //     nombre: 'Giselle Gacitua Canales',
  //     profesion: [{ nombre: 'Fonoaudiologia', id: 4 }],
  //   },
  //   {
  //     id: 5,
  //     nombre: 'Jael Vera Mora',
  //     profesion: [{ nombre: 'Terapia Ocupacional', id: 5 }],
  //   },
  //   {
  //     id: 6,
  //     nombre: 'Saray Salinas Sepulveda',
  //     profesion: [{ nombre: 'Psicología integral', id: 6 }],
  //   },
  //   {
  //     id: 7,
  //     nombre: 'Yolanda Sepulveda Cortez',
  //     profesion: [{ tipoProfesion: 'kinesiologia', id: 7 }],
  //   },
  // ];

  especialistas: Especialista[];

  serviciosEspecialista: Servicio[];
  serviciosEspecialidad: Servicio[];

  especialidades: Especialidad[];

  @Output()
  propagar = new EventEmitter<Date>();

  valueButton = 'filtroNombre';
  valueProfesion = 'especialista.id';
  professions = [];

  selectedDate: Date = new Date();

  // activeDayIsOpen: boolean = true;

  constructor(
    private especialistasService: EspecialistasService,
    private especialidadesService: EspecialidadService,
    private servicioService: ServiciosService
  ) {}

  ngOnInit(): void {
    this.getAllEspecialistas();
    // this.getServiciosByEspecialidad(2);
    this.getAllEspecialidades();
  }

  changeValueButton(value: string) {
    this.valueButton = value;
  }

  changeValueProfesion(idEspecialista: number) {
    console.log(idEspecialista);
    this.getServiciosByEspecialista(idEspecialista);
  }

  changeValueEspecialidad(idEspecialidad: number) {
    console.log(idEspecialidad);
    this.getServiciosByEspecialidad(idEspecialidad);
  }

  selectedChange(event) {
    this.selectedDate = event;
    this.propagar.emit(this.selectedDate);
  }

  userSelection() {}

  getAllEspecialistas() {
    this.especialistasService.getAll().subscribe(
      (especialistas) => {
        this.especialistas = especialistas;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAllEspecialidades() {
    this.especialidadesService.getAll().subscribe(
      (especialidades) => {
        this.especialidades = especialidades;
        console.log(especialidades);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getServiciosByEspecialista(idEspecialista: number) {
    this.servicioService
      .getServiciosByEspecialista(idEspecialista)
      .subscribe((servicios) => {
        this.serviciosEspecialista = servicios;
      });
  }

  ///aquiii incluir el método de serv

  getServiciosByEspecialidad(idEspecialidad: number) {
    this.servicioService
      .getServiciosByEspecialidad(idEspecialidad)
      .subscribe((servicios) => {
        this.serviciosEspecialidad = servicios;
        console.log(servicios);
      });
  }
}

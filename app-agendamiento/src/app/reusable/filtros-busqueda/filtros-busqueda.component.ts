import { Component, OnInit } from '@angular/core';

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

  box: any[] = [
    {
      nombre: 'box 1',
    },
    {
      nombre: 'box 2',
    },
    {
      nombre: 'box 3',
    },
    {
      nombre: 'box 4',
    },
    {
      nombre: 'box 5',
    },
  ];

  valueButton = 'filtroNombre';
  valueProfesion = 'especialista.id';
  professions = [];

  constructor() {}

  ngOnInit(): void {}

  changeValueButton(value: string) {
    this.valueButton = value;
  }

  changeValueProfesion(value: number) {
    this.professions = this.especialistas[value].profesion;
    console.log(this.professions);
  }
}

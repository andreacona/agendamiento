import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtros-busqueda',
  templateUrl: './filtros-busqueda.component.html',
  styleUrls: ['./filtros-busqueda.component.scss'],
})
export class FiltrosBusquedaComponent implements OnInit {
  especialistas: any[] = [
    {
      valor: 1,
      nombre: 'Claudia Contreras Ortega',
      profesion: 'Obstetricia',
    },
    {
      valor: 2,
      nombre: 'Constanza Domingues Pino',
      profesion: 'Nutricion',
    },
    {
      valor: 3,
      nombre: 'Freddy Torres Jimenez',
      profesion: 'Medicina General',
    },
    {
      valor: 4,
      nombre: 'Giselle Gacitua Canales',
      profesion: 'Fonoaudiologia',
    },
    {
      valor: 5,
      nombre: 'Jael Vera Mora',
      profesion: 'Terapia Ocupacional',
    },
    {
      valor: 6,
      nombre: 'Saray Salinas Sepulveda',
      profesion: 'Psicología integral',
    },
    {
      valor: 7,
      nombre: 'Yolanda Sepulveda Cortez',
      profesion: 'kinesiologia',
    },
  ];

  valueButton = 'filtroNombre';

  constructor() {}

  ngOnInit(): void {}

  changeValueButton(value: string) {
    this.valueButton = value;
    console.log(this.valueButton);
    console.log(value);
  }
}

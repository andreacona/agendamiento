import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-filtros-busqueda',
  templateUrl: './filtros-busqueda.component.html',
  styleUrls: ['./filtros-busqueda.component.scss']
})
export class FiltrosBusquedaComponent implements OnInit {

  nombreEspecialista: any[] = [{
    valor: 1,
    viewValue: 'Claudia Contreras Ortega'
  },
  {
    valor: 2,
    viewValue: 'Constanza Domingues Pino'
  },
  {
    valor: 3,
    viewValue: 'Freddy Torres Jimenez'
  },
  {
    valor: 4,
    viewValue: 'Giselle Gacitua Canales'
  },
  {
    valor: 5,
    viewValue: 'Jael Vera Mora'
  },
  {
    valor: 6,
    viewValue: 'Saray Salinas Sepulveda'
  },
  {
    valor: 7,
    viewValue: 'Yolanda Sepulveda Cortez',
  },
];
  constructor() { }

  ngOnInit(): void {
  }

}
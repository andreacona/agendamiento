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

  especialistas: any[] = [{
    valor: 4,
    viewValue: ['Valentina Escobar']
  }];

  servicios: any[] = [{
    valor: 4,
    viewValue: ['kinesiología']
  }];
  constructor() { }

  ngOnInit(): void {
  }

}

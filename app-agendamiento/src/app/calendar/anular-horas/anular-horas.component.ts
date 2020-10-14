import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-anular-horas',
  templateUrl: './anular-horas.component.html',
  styleUrls: ['./anular-horas.component.scss'],
})
export class AnularHorasComponent implements OnInit {
  //aquii//
  toppings = new FormControl();
  valueButton = 'filtroPaciente';

  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  constructor() {}

  ngOnInit(): void {}
  value = 'Búsqueda por RUT';

  changeValueButton(value: string) {
    console.log(value);
    this.valueButton = value;
  }

  changeValueEspecialista(value: number) {}
}

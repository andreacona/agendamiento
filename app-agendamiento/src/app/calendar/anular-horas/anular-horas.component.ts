import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EspecialistasService } from '../../service/especialistas.service';
import { Especialista } from '../../models/especialista';

@Component({
  selector: 'app-anular-horas',
  templateUrl: './anular-horas.component.html',
  styleUrls: ['./anular-horas.component.scss'],
})
export class AnularHorasComponent implements OnInit {
  especialistas: Especialista[];
  valueButton: string = 'filtroPaciente';
  fechaDeInicio = new FormControl(new Date());
  fechaDeFin = new FormControl(new Date());

  serializedDate = new FormControl(new Date().toISOString());

  constructor(private especialistasService: EspecialistasService) {}

  ngOnInit(): void {
    this.getAllEspecialistas();
  }

  changeValueButton(value: string) {
    this.valueButton = value;
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

  console() {
    console.log('Fecha inicio: ' + this.fechaDeInicio.value);
    console.log('Fecha fin: ' + this.fechaDeFin.value);
  }

  otroConsole2() {}
}

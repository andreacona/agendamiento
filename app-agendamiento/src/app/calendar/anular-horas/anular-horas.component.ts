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
  //aquii//

  especialistas: Especialista[];

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
}

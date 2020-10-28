import {Component, OnInit} from '@angular/core';
import {Especialista} from '../../models/especialista';
import {Servicio} from '../../models/servicio';
import {EspecialistasService} from '../../service/especialistas.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-bloqueo-horas',
  templateUrl: './bloqueo-horas.component.html',
  styleUrls: ['./bloqueo-horas.component.scss'],
})
export class BloqueoHorasComponent implements OnInit {
  especialistas: Especialista[];
  serviciosEspecialista: Servicio[];
  fechaDeInicio = new FormControl(new Date());
  fechaDeFin = new FormControl(new Date());

  horas: number[];

  minutos = ['00', '15', '30', '45'];

  serializedDate = new FormControl(new Date().toISOString());

  constructor(private especialistasService: EspecialistasService) {
  }

  ngOnInit(): void {
    this.getAllEspecialistas();
    this.cargarHoras();
  }

  getAllEspecialistas(): void {
    this.especialistasService.getAll().subscribe(
      (especialistas) => {
        this.especialistas = especialistas;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cargarHoras(): void {
    this.horas = [];

    for (let i = 1; i <= 24; i++) {
      this.horas.push(i);
    }

  }

  console() {
    console.log('Fecha inicio: ' + this.fechaDeInicio.value);
    console.log('Fecha fin: ' + this.fechaDeFin.value);
  }
}

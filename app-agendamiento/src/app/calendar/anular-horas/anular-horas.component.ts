import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {EspecialistasService} from '../../service/especialistas.service';
import {Especialista} from '../../models/especialista';
import {ReservasService} from '../../service/reservas.service';
import {Reserva} from '../../models/reserva';
import * as moment from 'moment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-anular-horas',
  templateUrl: './anular-horas.component.html',
  styleUrls: ['./anular-horas.component.scss'],
})
export class AnularHorasComponent implements OnInit {


  @ViewChild('modalAnular') modalAnular: TemplateRef<any>;

  especialistas: Especialista[];
  valueButton = 'filtroPaciente';
  fechaDeInicio = new FormControl(new Date());
  fechaDeFin = new FormControl(new Date());

  idEspecialista: number;

  reservasEncontradas: Reserva[] = [];

  rutCliente: string;

  serializedDate = new FormControl(new Date().toISOString());
  private idReservaAnular: number;

  constructor(private especialistasService: EspecialistasService,
              private reservasService: ReservasService,
              private modal: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllEspecialistas();
  }

  changeValueButton(value: string): void {
    this.valueButton = value;
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

  getReservasByEspecialistaAndFechas(): void {
    const sFechaInicio = moment(this.fechaDeInicio.value).format('YYYY-MM-DD');
    const sFechaFin = moment(this.fechaDeFin.value).format('YYYY-MM-DD');

    this.reservasService
      .getReservasByEspecialistaAndFechas(this.idEspecialista, sFechaInicio, sFechaFin).subscribe(
      response => {
        console.log(response);
        this.reservasEncontradas = response;

      }
    );

  }


  getReservasByRutCliente(): void {
    this.reservasService.getReservasByRutCliente(this.rutCliente).subscribe(
      response => {
        this.reservasEncontradas = response;
        console.log(response);

      }
    );
  }

  openModalAnular(idReserva: number): void {
    this.idReservaAnular = idReserva;
    this.modal.open(this.modalAnular, {size: 'anular'});
  }

  anularReserva(): void {
    this.reservasService.anularById(this.idReservaAnular).subscribe(
      response => {
        console.log(response);
        this.modal.dismissAll();
        this.refreshReservas();
      }
    );
  }

  private refreshReservas(): void {
    if (this.valueButton === 'filtroPaciente') {
      this.getReservasByRutCliente();
    } else {
      this.getReservasByEspecialistaAndFechas();
    }
  }

  closeModal(): void {
    this.modal.dismissAll();
  }
}


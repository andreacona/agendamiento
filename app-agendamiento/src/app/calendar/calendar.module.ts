import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { HomeComponent } from './home/home.component';
import { VistaDiariaComponent } from './vista-diaria/vista-diaria.component';
import { VistaSemanalComponent } from './vista-semanal/vista-semanal.component';

import { ReusableModule } from '../reusable/reusable.module';
import { MatDatepicker } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BloqueoHorasComponent } from './bloqueo-horas/bloqueo-horas.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [VistaSemanalComponent, HomeComponent, BloqueoHorasComponent],
  imports: [
    RouterModule,
    CommonModule,
    CalendarRoutingModule,
    ReusableModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [MatDatepicker],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarModule {}

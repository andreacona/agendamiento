import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { HomeComponent } from './home/home.component';
import { VistaDiariaComponent } from './vista-diaria/vista-diaria.component';
import { VistaSemanalComponent } from './vista-semanal/vista-semanal.component';

import { ReusableModule } from '../reusable/reusable.module';
import { MatDatepicker } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [VistaSemanalComponent, HomeComponent],
  imports: [
    RouterModule,
    CommonModule,
    CalendarRoutingModule,
    ReusableModule,
    MatNativeDateModule,
  ],
  providers: [MatDatepicker],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarModule {}

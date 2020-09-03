import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { HomeComponent } from './home/home.component';
import { VistaDiariaComponent } from './vista-diaria/vista-diaria.component';
import { VistaSemanalComponent } from './vista-semanal/vista-semanal.component';
import { VistaMensualComponent } from './vista-mensual/vista-mensual.component';

import { ReusableModule } from '../reusable/reusable.module';




@NgModule({
  declarations: [
    VistaDiariaComponent,
    VistaSemanalComponent,
    VistaMensualComponent,
    HomeComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    ReusableModule,
  ]
})
export class CalendarModule { }

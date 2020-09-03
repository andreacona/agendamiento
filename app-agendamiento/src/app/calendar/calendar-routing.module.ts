import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { VistaDiariaComponent } from './vista-diaria/vista-diaria.component';
import { VistaMensualComponent } from './vista-mensual/vista-mensual.component';
import { VistaSemanalComponent } from './vista-semanal/vista-semanal.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dia',
        component: VistaDiariaComponent,
      },
      {
        path: 'mes',
        component: VistaMensualComponent,
      },
      {
        path: 'semana',
        component: VistaSemanalComponent,
      },
      {
        path: '',
        redirectTo: 'dia',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }

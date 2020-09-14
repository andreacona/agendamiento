import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalPopUpComponent } from '../reusable/modal-pop-up/modal-pop-up.component';

import { HomeComponent } from './home/home.component';
import { VistaDiariaComponent } from './vista-diaria/vista-diaria.component';

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
  exports: [RouterModule],
})
export class CalendarRoutingModule {}

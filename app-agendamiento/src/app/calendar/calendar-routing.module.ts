import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import { HomeComponent } from './home/home.component';
import { VistaDiariaComponent } from './vista-diaria/vista-diaria.component';
import { VistaSemanalComponent } from './vista-semanal/vista-semanal.component';
import { ModalPopUpComponent } from './../reusable/modal-pop-up/modal-pop-up.component';

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
        path: 'modal',
        component: ModalPopUpComponent,
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

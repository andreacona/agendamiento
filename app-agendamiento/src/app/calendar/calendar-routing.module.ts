import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import { HomeComponent } from './home/home.component';
import { VistaDiariaComponent } from './vista-diaria/vista-diaria.component';
import { ModalPopUpComponent } from './../reusable/modal-pop-up/modal-pop-up.component';
import { AnularHorasComponent } from './anular-horas/anular-horas.component';

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
      {
        path: 'anular-horas',
        component: AnularHorasComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}

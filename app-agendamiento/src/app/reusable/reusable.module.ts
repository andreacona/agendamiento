import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FiltrosBusquedaComponent } from './filtros-busqueda/filtros-busqueda.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FiltrosBusquedaComponent],

  imports: [
    CommonModule,
    MatMenuModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatGridListModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatCheckboxModule,
  ],

  exports: [HeaderComponent, FiltrosBusquedaComponent],
})
export class ReusableModule {}

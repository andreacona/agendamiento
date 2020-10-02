import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes //

import { HeaderComponent } from './header/header.component';
import { FiltrosBusquedaComponent } from './filtros-busqueda/filtros-busqueda.component';
import { ModalPopUpComponent } from '././modal-pop-up/modal-pop-up.component';

// angular material //

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
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@NgModule({
  declarations: [
    HeaderComponent,
    FiltrosBusquedaComponent,
    ModalPopUpComponent,
  ],

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
    MatDialogModule,
  ],

  exports: [HeaderComponent, FiltrosBusquedaComponent],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
})
export class ReusableModule {}

import { BrowserModule } from '@angular/platform-browser';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReusableModule } from './reusable/reusable.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import * as moment from 'moment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { VistaDiariaComponent } from './calendar/vista-diaria/vista-diaria.component';
import { ModalPopUpComponent } from './reusable/modal-pop-up/modal-pop-up.component';

@NgModule({
  declarations: [AppComponent, VistaDiariaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReusableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CalendarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory,
    }),
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
  ],

  entryComponents: [ModalPopUpComponent],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

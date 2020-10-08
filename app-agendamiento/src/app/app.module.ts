import { BrowserModule } from '@angular/platform-browser';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

//COMPONENTS
import { AppComponent } from './app.component';
import { AnularHorasComponent } from './calendar/anular-horas/anular-horas.component';

//ANGULAR MATERIAL

import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReusableModule } from './reusable/reusable.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarNativeDateFormatter,
  DateAdapter,
  DateFormatterParams,
} from 'angular-calendar';
import * as moment from 'moment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { VistaDiariaComponent } from './calendar/vista-diaria/vista-diaria.component';
import { ModalPopUpComponent } from './reusable/modal-pop-up/modal-pop-up.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/** FORMATEAR HORAS
 * necesita cambio en clases css: .cal-day-view .cal-hour-segment.cal-after-hour-start .cal-time (style.scss)
 */
class CustomDateFormatter extends CalendarNativeDateFormatter {
  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat('es', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }
}

@NgModule({
  declarations: [AppComponent, VistaDiariaComponent, AnularHorasComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReusableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CalendarModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: momentAdapterFactory,
      }, // FORMATEAR HORA
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CustomDateFormatter,
        },
      }
    ),
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
  ],

  entryComponents: [ModalPopUpComponent],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}

export function momentAdapterFactory(): DateAdapter {
  return adapterFactory(moment);
}

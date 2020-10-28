import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class Utils {

  constructor() {
  }

  public calcularEdadString(fechaNacimiento: Date): string {
    if (fechaNacimiento) {
      const anios = moment().diff(fechaNacimiento, 'years');
      if (anios >= 2) {
        return anios + ' años';

      } else {
        const meses = moment().diff(fechaNacimiento, 'month');
        return meses + (meses !== 1 ? ' meses' : ' mes');

      }

    } else {
      return null;
    }
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialistasService {

  urlEndpoint = 'http://localhost:8080/' + 'especialista';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.urlEndpoint + '/get-all');
  }


}

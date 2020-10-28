import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseToken} from '../models/response-token';
import {environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlEndpoint = environment.apiUrl + 'auth';

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string): Observable<ResponseToken> {
    const url = this.urlEndpoint + `/login`;

    return this.httpClient.post<ResponseToken>(url, {username, password});
    // return this.httpClient.get<ResponseToken>(url);

  }

}

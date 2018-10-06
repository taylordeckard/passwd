import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from './shared';
import { LoginPost } from './interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  public login (loginPost: LoginPost): Observable<Object> {
    return this.http.post(`${constants.backendBaseUrl}/login`, loginPost);
  }
}

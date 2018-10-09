import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from './shared';
import { LoginPost } from './interfaces';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  public isLoggedIn: boolean;
  public loggedInSubject: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) {}
  public login (loginPost: LoginPost): Observable<any> {
    return this.http.post(`${constants.backendBaseUrl}/login`, loginPost)
      .pipe(map((response: any) => {
        this.isLoggedIn = response.loggedIn;
        this.loggedInSubject.next(this.isLoggedIn);
        return response;
      }));
  }
  public getUser(): Observable<any> {
    return this.http.get(`${constants.backendBaseUrl}/user`);
  }
}

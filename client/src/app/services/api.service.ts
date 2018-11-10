import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from 'app/shared';
import { LoginPost, NewUserForm, User } from 'app/interfaces';
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
  public applyReset (body: { password: string, token: string }): Observable<any> {
    return this.http.put(`${constants.backendBaseUrl}/reset`, body);
  }
  public initReset (body: { email: string }): Observable<any> {
    return this.http.post(`${constants.backendBaseUrl}/reset`, body);
  }
  public getUser(): Observable<any> {
    return this.http.get(`${constants.backendBaseUrl}/user`);
  }
  public updateUser(user: User): Observable<any> {
    return this.http.put(`${constants.backendBaseUrl}/user`, user);
  }
  public createUser(token: string): Observable<any> {
    return this.http.post(`${constants.backendBaseUrl}/user`, { token });
  }
  public register(user: NewUserForm) {
    return this.http.post(`${constants.backendBaseUrl}/register`, user);
  }
}

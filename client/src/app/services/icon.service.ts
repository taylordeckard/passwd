import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from 'app/shared';
import { LoginPost } from 'app/interfaces';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class IconService {
  constructor(private http: HttpClient) {}
  public load (url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' });
  }
}

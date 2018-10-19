import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from 'app/shared';
import { LoginPost } from 'app/interfaces';
import { Observable, Subject, timer, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

@Injectable()
export class IconService {
  constructor(private http: HttpClient) {}
  // save responses to a cache so that we don't make a new request every time an icon is rendered
  private cache: { [key: string]: string } = {};
  // lock so that only 1 request is made for each icon
  private lock: { [key: string]: boolean } = {};

  public load (url: string): Observable<any> {
    if (this.cache[url]) {
      // use cached svg if available
      return of(this.cache[url]);
    }
    if (this.lock[url]) {
      // try again after a brief wait
      return timer(100).pipe(flatMap(() => this.load(url)));
    }
    // otherwise request the svg
    this.lock[url] = true;
    return this.http.get(url, { responseType: 'text' })
      .pipe(map(response => {
        // cache the response
        this.cache[url] = response;
        // remove the lock
        delete this.lock[url];
        return response;
      }));
  }
}

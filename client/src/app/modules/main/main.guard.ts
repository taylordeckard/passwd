import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot,
} from '@angular/router';
import { AppStateService } from 'app/services';

@Injectable()
export class MainGuard implements CanActivate {
  constructor (
    private state: AppStateService,
    private router: Router,
  ) {}
  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (this.state.user) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

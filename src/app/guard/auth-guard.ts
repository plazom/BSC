import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
  ) { }

  canActivate(_: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    // check authorization here
    return of(true);
  }
}

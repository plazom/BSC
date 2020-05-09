import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate(): Observable<boolean>;
}

@Injectable()
export class SaveFormChangesGuard implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate();
  }
}

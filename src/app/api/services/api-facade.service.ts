import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DBDataType } from '../types/db-data.type';
import { ApiService } from './api.service';

@Injectable()
export class ApiFacadeService extends ApiService {
  data$: BehaviorSubject<DBDataType[]> = new BehaviorSubject([]);

  getData$(id:string = ''):BehaviorSubject<DBDataType[]>  {
    super.getData$().pipe(take(1)).subscribe(
      (result: Array<DBDataType>) => {
        this.data$.next(result);
      },
      (error) => console.error(error)
    );

    return this.data$;
  }

  newRow$(newValue: DBDataType): Observable<DBDataType> {
    let newRow$ = super.newRow$(newValue);
    combineLatest([
      this.data$,
      newRow$,
    ]).pipe(take(1)).subscribe(
      ([arr, result]) => {
        this.data$.next(arr.concat([result]));
      },
      (error) => console.error(error)
    );

    return newRow$;
  }

  editRow$(id:string, newValue: DBDataType): Observable<DBDataType> {
    let editRow$ = super.editRow$(id, newValue);
    combineLatest([
      this.data$,
      editRow$,
    ]).pipe(take(1)).subscribe(
      ([arr, result]) => {
        const index = arr.findIndex((data: DBDataType) => data.id.toString() === id);
        if (index >= 0) {
          // remove element and add new
          arr.splice(index, 1, result);

          // send cloned array
          this.data$.next(arr.slice(0));
        }
      },
      (error) => console.error(error)
    );
    return editRow$;
  }

  deleteRow$(id: string):Observable<DBDataType[]> {
    let deleteRow$ = super.deleteRow$(id);
    combineLatest([
      this.data$,
      deleteRow$,
    ]).pipe(take(1)).subscribe(
      ([arr, result]) => {
        const index = arr.findIndex((data: DBDataType) => data.id.toString() === id);
        if (index >= 0) {
          // remove element
          arr.splice(index, 1);
          // send cloned array
          this.data$.next(arr.slice(0));
        }
      },
      (error) => console.error(error)
    );

    return deleteRow$;
  }

}

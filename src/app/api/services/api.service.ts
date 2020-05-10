import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DBDataType } from '../types/db-data.type';

@Injectable()
export class ApiService {
  baseUrl = '';
  prefix = '';
  constructor(private httpClient: HttpClient) {}

  getData(id:string = ''):Observable<DBDataType[]>  {
    return this.httpClient.get<DBDataType[]>(this.baseUrl + id);
  }

  newRow(newValue: DBDataType): Observable<DBDataType> {
    return this.httpClient.post<DBDataType>(this.baseUrl, newValue);
  }

  editRow(id:string, newValue: DBDataType): Observable<DBDataType> {
    return this.httpClient.put<DBDataType>(
      this.baseUrl.concat(this.prefix, id),
      newValue
    );
  }

  deleteRow(id: string):Observable<DBDataType[]> {
    return this.httpClient.delete<DBDataType[]>(this.baseUrl.concat(this.prefix, id));
  }
}

import { Injectable } from '@angular/core';
import { ApiFacadeService } from './api-facade.service';

@Injectable()
export class NotesApiService extends ApiFacadeService{
  baseUrl = 'http://private-9aad-note10.apiary-mock.com/notes';
}

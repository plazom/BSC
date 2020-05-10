import { Injectable } from '@angular/core';
import { ApiFacadeService } from './api-facade.service';

@Injectable()
export class UsersApiService extends ApiFacadeService{
	baseUrl = 'http://localhost:3000/users/';
}
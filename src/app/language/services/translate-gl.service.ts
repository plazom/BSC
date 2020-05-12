import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslateGlService {
  translateGl: TranslateService;

  constructor(private translate: TranslateService) {
  }

  getInstance(): TranslateService  {
    return this.translateGl? this.translateGl: this.translate;
  }

  setInstance(service: TranslateService): void  {
    this.translateGl = service;
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageEnum } from '../enums/language.enum';

@Injectable()
export class LanguageService {
  lang$: BehaviorSubject<LanguageEnum> = new BehaviorSubject(LanguageEnum.CZ);

  getLanguage$():BehaviorSubject<LanguageEnum>  {
    return this.lang$;
  }

  setLanguage(id: LanguageEnum): void {
    this.lang$.next(id);
  }

  getLangIds(): LanguageEnum[] {
    return Object.keys(LanguageEnum).map((index:string) => LanguageEnum[index])
  }
}

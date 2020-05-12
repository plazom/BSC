import { Pipe, PipeTransform } from '@angular/core';
import { TranslateGlService } from '../services/translate-gl.service';
@Pipe({
  name: 'translateGl',
  pure: false,
})
export class TranslateGlPipe implements PipeTransform {
  constructor (private translateService: TranslateGlService){}
  transform(key: string): string {
    return this.translateService.getInstance().instant(key);
  }
}

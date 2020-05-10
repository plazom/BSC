import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortTable',
})
export class ArraySortPipe implements PipeTransform {
  transform(array: any[], field: string, idDown: boolean): any[] {
    let kof = idDown ? 1 : -1;
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1 * kof;
      } else if (a[field] > b[field]) {
        return 1 * kof;
      } else {
        return 0;
      }
    });
    return array;
  }
}

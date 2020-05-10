import { AbstractControl } from '@angular/forms';

export const MinDateValueValidator = (min:Date) => {
  return (control:AbstractControl) => {
    var date = new Date(control.value);
    if(date && date < min){
      return {
				'minDateValue': true
      };
    }
    return null;
  };
};

export const MaxDateValueValidator = (max:Date) => {
  return (control:AbstractControl) => {
    var date = new Date(control.value);
    if(date && date > max){
      return {
				'maxDateValue': true
      };
    }
    return null;
  };
};

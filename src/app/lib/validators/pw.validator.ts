import { ValidatorFn, AbstractControl } from '@angular/forms';

export function patternValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return {};
    }
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    const valid = regex.test(control.value);
    return valid ? {} : { invalidPassword: true };
  };
}

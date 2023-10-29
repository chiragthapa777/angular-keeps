import { ValidatorFn, AbstractControl } from '@angular/forms';

export function alreadyExistValidator<T>(arr : Array<T>): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value : T = control.value
    if (!value) {
      return {};
    }
    const valid = !arr.includes(value)
    return valid ? {} : { alreadyExits: true };
  };
}

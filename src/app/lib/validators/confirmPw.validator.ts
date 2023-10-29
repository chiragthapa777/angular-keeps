import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ConfirmedValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);
    if (control && matchingControl) {
      if (
        (matchingControl.errors &&
          !matchingControl.errors['confirmedValidator']) ||
        (control.invalid && control.touched)
      ) {
        return null;
      }
      if (control.value !== matchingControl?.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }

    return null;
  };
}

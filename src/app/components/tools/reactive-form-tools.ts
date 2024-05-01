import { AbstractControl, FormGroup } from "@angular/forms";

export function getFormControl(form: FormGroup,name: string) {
  return form.get(name)
}

export function isControlInvalid(control: AbstractControl | null) {
  return control?.touched && control?.invalid
}

export function hasControlError(control: AbstractControl | null, errorCode: string) {
  return control?.touched && control?.hasError(errorCode)
}

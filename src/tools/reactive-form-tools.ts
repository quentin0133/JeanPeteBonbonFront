import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function getFormControl(form: FormGroup, name: string) {
    return form.get(name)
}

export function isControlInvalid(control: AbstractControl | null) {
    return control?.touched && control?.invalid
}

export function hasControlError(control: AbstractControl | null, errorCode: string) {
    return control?.touched && control?.hasError(errorCode)
}

export function mustMatch(matchingControl: AbstractControl): ValidatorFn {
    // Le paramètre control fait référence au FormControl auquel on va appliquer le validateur
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value !== matchingControl.value // condition de validation
        ? { // Objet de type ValidationErrors
            mustmatch: { // errorCode : {value: errorValue}
                value: control.value
            }
        } : null;
    }
}

import { ValidatorFn } from "@angular/forms";

export function trimmedLengthValidator(length: number): ValidatorFn {
    return (control) => {
        const inputValue = control.value
        
        return inputValue?.trim().length >= length ? null : { trimmedLengthValidator: true }
    }
}
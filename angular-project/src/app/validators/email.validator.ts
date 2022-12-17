import { FormGroup, ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {
    return (control) => {
        const group = control as FormGroup
        const emailValue = group.value

        const emailRegExp = /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}/gm;
        const emailIsValid = emailValue.match(emailRegExp);
        
        return emailIsValid ? null : { emailValidator: true }
    }
}
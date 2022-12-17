import { FormGroup, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
    return (control) => {
        const group = control as FormGroup
        const emailValue = group.value

        const passwordRegExp = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{6,}$/gm;
        const passwordIsValid = emailValue.match(passwordRegExp);

        return passwordIsValid ? null : { passwordValidator: true }
    }
}
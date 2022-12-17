import { FormGroup, ValidatorFn } from "@angular/forms";

export function confirmPasswordValidator(password: string, confirmPassword: string): ValidatorFn {
    return (control) => {
        const group = control as FormGroup
        const passwordValue = group.get(password)?.value
        const confirmPasswordValue = group.get(confirmPassword)?.value
        
        return passwordValue === confirmPasswordValue ? null : { confirmPasswordValidator: true }
    }
}
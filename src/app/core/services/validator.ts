import { AbstractControl, FormControl } from '@angular/forms';
export class CustomValidators {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('NewPassword').value; // to get value in input tag
        const confirmPassword = AC.get('ConfirmPassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            AC.get('ConfirmPassword').setErrors({ MatchPassword: true });
        } else {
            return null;
        }
    }
    static noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'required': true };
    }
    static timeValidators(control: FormControl) {
        if (control.value.length === 4) {
            const time = control.value.match(/.{1,2}/g);
            if (Number(time[0]) > 23) {
                return { 'invalidTime': true };
            } else if (Number(time[1]) > 59) {
                return { 'invalidTime': true };
            }
        } else {
            return { 'invalidTime': true };
        }
    }
    static EndtimeValidators(control: FormControl) {
        if (control.value.length === 4) {
            const time = control.value.match(/.{1,2}/g);
            if (control.value === '0000') {
                return { 'invalidEndTime': true };
            } else {
                if (Number(time[0]) > 23) {
                    return { 'invalidEndTime': true };
                } else if (Number(time[1]) > 59) {
                    return { 'invalidEndTime': true };
                }
            }
        } else {
            return { 'invalidEndTime': true };
        }
    }
}

import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidatorsService {

    constructor() {
    }

    /*手机号码*/
    static phone = (control: FormControl) => {
        const val = (control.value || '') + '';
        const reg = /^1[34578]\d{9}$/;
        const valid = reg.test(val);
        return valid ? null : {phoneValidator: true};
    };

    /*5~6位短信验证码*/
    static minNumber = (control: FormControl) => {
        const val = (control.value || '') + '';
        const reg = /^\d{5,6}$/;
        const valid = reg.test(val);
        return valid ? null : {numberValidator: true};
    };
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Events, ModalController} from '@ionic/angular';
import {UtilService} from '../services/util.service';
import {UserService} from '../services/user.service';
import {ValidatorsService} from '../services/validators.service';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;
    showMessage: any;
    // 验证码倒计时
    verifyCode: any = {
        verifyCodeTips: '获取验证码',
        countdown: 30,
        disable: true
    };

    constructor(public modalCtrl: ModalController,
                public utilService: UtilService,
                public userService: UserService,
                public storage: Storage,
                public events: Events,
                public fb: FormBuilder) {
        this.loginForm = this.fb.group({
            phone: ['', [ValidatorsService.phone]],
            phoneCode: ['', [ValidatorsService.minNumber]]
        });
    }

    ngOnInit() {
    }

    /**
     * 关闭当前页面
     */
    dismiss() {
        this.modalCtrl.dismiss({
            dismissed: true
        });
    }


    async login() {
        const loading = await this.utilService.showLoading();

        if (this.loginForm.valid) {
            this.userService.httpPost(this.loginForm.value)
                .subscribe(
                     data => {
                        if (data.code === 0) {
                            // 本地存储
                            this.storage.set('user', data.data);
                            // 消息通知
                            this.events.publish('user:login', data.data, true);

                            this.utilService.showToast('登录成功');
                        } else {
                            this.utilService.showToast(data.msg);
                        }
                        loading.dismiss();
                        this.dismiss();
                    },
                    error => this.showMessage = error
                );
        }
    }

    // 倒计时
    settime() {
        if (this.verifyCode.countdown === 1) {
            this.verifyCode.countdown = 60;
            this.verifyCode.verifyCodeTips = '获取验证码';
            this.verifyCode.disable = true;
            return;
        } else {
            this.verifyCode.countdown--;
        }

        this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
        setTimeout(() => {
            this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
            this.settime();
        }, 1000);
    }

    getCode() {
        if (this.loginForm.value.phone === '') {
            this.utilService.showToast('请输入手机号码');
            return;
        }

        // 发送验证码成功后开始倒计时
        if (this.verifyCode.disable) {
            this.userService.httpGetVerifyCode(this.loginForm.value.phone).subscribe(data => {
                if (data.code === 'OK') {
                    console.log(data);
                } else {
                    // this.utilService.showToast(data.msg);
                }
            });
        }
        this.verifyCode.disable = false;
        this.settime();
    }

}

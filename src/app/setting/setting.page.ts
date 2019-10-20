import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Storage} from '@ionic/storage';
import {ModalController, NavController} from '@ionic/angular';
import {LoginPage} from '../login/login.page';
import {UtilService} from '../services/util.service';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.page.html',
    styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
    formGroup: FormGroup;
    user: any;

    constructor(public fb: FormBuilder,
                public storage: Storage,
                public modalCtrl: ModalController,
                public utileService: UtilService,
                public userService: UserService,
                public navCtrl: NavController) {
        this.storage.get('user').then(
            async user => {
                if (user == null) {
                    const loginModal = await this.modalCtrl.create({
                        component: LoginPage
                    });
                    loginModal.present();
                    this.navCtrl.navigateRoot('/tabs/index');
                } else {
                    this.user = user;
                    this.loadUserInfo();
                }
            });

        this.formGroup = this.fb.group({
            name: [],
            sex: [],
            phone: [],
            birth: []
        });
    }

    ngOnInit() {

    }

    async save() {
        const loading = await this.utileService.showLoading();
        this.formGroup.value.id = this.user._id;
        this.userService.httpPostProfile(this.formGroup.value).subscribe(data => {
            if (data.code === 0) {
                loading.dismiss();
                this.utileService.showToast('更新成功。');
            }
        });
    }

    loadUserInfo() {
        this.userService.httpGetUser(this.user._id)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        const userMsg = res.data;
                        this.formGroup.reset({
                            name: userMsg.name,
                            sex: userMsg.sex,
                            phone: userMsg.phone,
                            birth: userMsg.birth
                        });
                    }
                }
            );
    }

    logout() {
        this.storage.clear();
        this.navCtrl.navigateRoot('/tabs/index');
    }

}

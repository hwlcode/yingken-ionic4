import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorsService} from '../services/validators.service';
import {ActivatedRoute} from '@angular/router';
import {Storage} from '@ionic/storage';
import {UserService} from '../services/user.service';
import {ModalController, NavController} from '@ionic/angular';
import {UtilService} from '../services/util.service';
import {LoginPage} from '../login/login.page';

@Component({
    selector: 'app-add-address',
    templateUrl: './add-address.page.html',
    styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
    id: string = null;
    fromGroup: FormGroup;
    address: any;
    user: any;

    constructor(public fb: FormBuilder,
                public activeRoute: ActivatedRoute,
                public storage: Storage,
                public navCtl: NavController,
                public modalCtrl: ModalController,
                public utilService: UtilService,
                public userService: UserService) {
        this.storage.get('user').then(
            async user => {
                if (user == null) {
                    const loginModal = await this.modalCtrl.create({
                        component: LoginPage
                    });
                    loginModal.present();
                    this.navCtl.navigateRoot('/tabs/index');
                }
            });

        this.fromGroup = this.fb.group({
            name: ['', Validators.required],
            phone: ['', [ValidatorsService.phone]],
            address: ['', Validators.required]
        });

        this.activeRoute.queryParams.subscribe(data => {
            this.address = data.address;
            this.user = data.user;

            if (data.address !== undefined) {
                this.id = data.address._id;
                this.fromGroup.reset({
                    name: data.address.name,
                    phone: data.address.phone,
                    address: data.address.address
                });
            }
        });
    }

    ngOnInit() {
    }

    delAddress() {

    }

    async update() {
        const loading = await this.utilService.showLoading('保存中...');
        if (this.fromGroup.valid) {
            if (this.id != null) {
                this.fromGroup.value.id = this.id;
            }
            this.fromGroup.value.userId = this.user._id;
            this.fromGroup.value.is_default = 0;
            this.userService.httpPostAddress(this.fromGroup.value).subscribe(data => {
                if (data.code === 0) {
                    loading.dismiss();
                    this.utilService.showToast('更新成功。');
                    this.navCtl.pop();
                }
            });
        }
    }

    remove() {
        this.userService.delUserAddress(this.id).subscribe(data => {
            if (data.code === 0) {
                this.navCtl.pop();
            }
        });
    }

}

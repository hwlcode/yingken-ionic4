import {Component, OnInit} from '@angular/core';
import {UtilService} from '../services/util.service';
import {UserService} from '../services/user.service';
import {Storage} from '@ionic/storage';
import {ModalController, NavController} from '@ionic/angular';
import {LoginPage} from '../login/login.page';

@Component({
    selector: 'app-address',
    templateUrl: './address.page.html',
    styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
    address: any = [];
    user: any;

    constructor(public utilService: UtilService,
                public userService: UserService,
                public storage: Storage,
                public modalCtrl: ModalController,
                public navCtrl: NavController) {
        this.storage.get('user').then(async user => {
            if (user != null) {
                this.user = user;
            } else {
                const loginModal = await this.modalCtrl.create({
                    component: LoginPage
                });
                loginModal.present();
                this.navCtrl.navigateRoot('/tabs/index');
            }
        });
    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.getAdderss();
    }

    async getAdderss() {
        if (this.user !== undefined) {
            const loading = await this.utilService.showLoading();
            this.userService.getHttpUserAddress(this.user._id).subscribe(data => {
                if (data.code === 0) {
                    loading.dismiss();
                    this.address = data.data;
                }
            });
        }
    }

    changeAddress(address) {
        this.navCtrl.navigateForward('/add-address', {
            queryParams: {
                address,
                user: this.user
            }
        });
    }

    changeDefault(id) {
        this.userService.changeUserDefaultAddress(this.user._id, id).subscribe(data => {
            if (data.code === 0) {
                this.utilService.showToast('您己更改收货地址！');
                this.address = data.data;
            }
        });
    }

    addAddress() {
        this.navCtrl.navigateForward('/add-address', {
            queryParams: {
                user: this.user
            }
        });
    }

}

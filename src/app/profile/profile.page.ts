import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {LoginPage} from '../login/login.page';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    constructor(public navCtl: NavController,
                public storage: Storage,
                public modalCtrl: ModalController,
                public navCtrl: NavController) {
        this.storage.get('user').then(
            async user => {
                if (user == null) {
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

    goToVersion() {
        this.navCtl.navigateForward('/version');
    }

    goToAbout() {
        this.navCtl.navigateForward('/about');
    }

    goToAddress() {
        this.navCtl.navigateForward('/address');
    }

    goToOrders() {
        this.navCtl.navigateForward('/orders');
    }

}

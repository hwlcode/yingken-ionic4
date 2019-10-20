import {Component, OnInit} from '@angular/core';
import {LoginPage} from '../login/login.page';
import {Storage} from '@ionic/storage';
import {ModalController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.page.html',
    styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

    constructor(
        public storage: Storage,
        public modalCtrl: ModalController,
        public navCtrl: NavController
    ) {
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

    segmentChanged(e) {

    }

}

import {Component, ViewChild} from '@angular/core';
import {Events, IonTabs, ModalController, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {LoginPage} from '../login/login.page';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    @ViewChild('ionTabs', {static: false}) tabs: IonTabs;
    cartNum = 0;

    constructor(public events: Events,
                public storage: Storage,
                public navCtrl: NavController,
                public modalCtrl: ModalController) {
        this.events.subscribe('cart:add', cart => {
            if (cart.length === 0) {
                this.cartNum = 0;
            } else {
                let n = 0;
                cart.map(item => {
                    n += item.num;
                });
                this.cartNum = n;
            }
        });
        this.storage.get('cart').then(
            cart => {
                if (cart !== null) {
                    let n = 0;
                    cart.map(item => {
                        n += item.num;
                    });
                    this.cartNum = n;
                }
            }
        );
    }

    tabClick() {
        const tab = this.tabs.getSelected();
        if (tab === 'cart' || tab === 'profile') {
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
    }

}

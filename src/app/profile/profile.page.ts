import {Component, OnInit} from '@angular/core';
import {ModalController, NavController, Events} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {LoginPage} from '../login/login.page';
import {MessagesService} from '../services/messages.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    messageNum = 0;
    userId: string;
    user: any;
    avatar: string;

    constructor(public navCtl: NavController,
                public storage: Storage,
                public modalCtrl: ModalController,
                public events: Events,
                public messageService: MessagesService,
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
                    this.userId = user._id;
                    if (user.avatar != null) {
                        this.avatar = user.avatar;
                    } else {
                        this.avatar = 'assets/images/avatar.png';
                    }
                    this.user = user;
                    this.getUnRead();
                }
            });

        this.events.subscribe('notification:del', (num) => {
            this.messageNum = num;
        });

        this.events.subscribe('notification:read', (num) => {
            this.messageNum = num;
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

    getUnRead() {
        this.messageService.unReadUserNotification(this.userId)
            .subscribe(res => {
                if (res.code === 0) {
                    if (res.data.length > 0) {
                        this.messageNum = res.data.length;
                    }
                }
            });
    }

}

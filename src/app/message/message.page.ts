import {Component, OnInit} from '@angular/core';
import {Events, ModalController, NavController} from '@ionic/angular';
import {MessagesService} from '../services/messages.service';
import {Storage} from '@ionic/storage';
import {LoginPage} from '../login/login.page';

@Component({
    selector: 'app-message',
    templateUrl: './message.page.html',
    styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
    items: any;
    userId: string;
    showNotification = false;

    constructor(public storage: Storage,
                public modalCtrl: ModalController,
                public navCtrl: NavController,
                public messageService: MessagesService,
                public events: Events) {
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
        this.storage.get('user').then(val => {
            if (val != null) {
                this.userId = val._id;
                this.getNotification();
            }
        });
    }

    ionViewDidLoad() {

    }

    getNotification() {
        this.messageService.getUserNotificationList(this.userId).subscribe(res => {
            if (res.code === 0) {
                this.items = res.data;
                if (res.data.length > 0) {
                    this.showNotification = true;
                }
            }
        });
    }

    removeItem(item) {
        this.messageService.delUserNotification(item._id, this.userId)
            .subscribe(res => {
                if (res.code === 0) {
                    for (let i = 0; i < this.items.length; i++) {
                        if (this.items[i] === item) {
                            this.items.splice(i, 1);
                        }
                    }
                    this.events.publish('notification:del', res.data.unReadNum);
                }
            });
    }

    readItem(item) {
        if (item.read === 0) {
            this.messageService.readUserNotification(item._id, this.userId)
                .subscribe(res => {
                    if (res.code === 0) {
                        item.read = 1;
                        this.events.publish('notification:read', res.data.unReadNum);
                    }
                });
        }
    }

    doRefresh(refresher) {
        this.messageService.getUserNotificationList(this.userId).subscribe(res => {
            if (res.code === 0) {
                this.items = res.data;
                refresher.target.complete();
            }
        });
    }
}

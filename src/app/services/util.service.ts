import {Injectable} from '@angular/core';
import {ToastController, LoadingController, AlertController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(public toastCtrl: ToastController,
                public loadingController: LoadingController,
                public alertCtrl: AlertController,
                ) {
    }

    async showToast(message?: string) {
        const toast = await this.toastCtrl.create({
            message: message + '',
            duration: 3000, // 默认展示的时长
            position: 'top'
        });

        await toast.present();
        return toast;
    }

    async showLoading(message: string = '') {
        const loading = await this.loadingController.create({
            message: message + ''
        });

        await loading.present();
        return loading;
    }

    async alert(message, callback?) {
        if (callback) {
            const alert = await this.alertCtrl.create({
                header: '提示',
                message,
                buttons: [
                    {
                        text: '取消',
                        handler: data => {
                            // console.log('Cancel clicked');
                        }
                    },
                    {
                        text: '确定',
                        handler: data => {
                            callback();
                        }
                    }]
            });
            alert.present();
        } else {
            const alert = await this.alertCtrl.create({
                header: '提示',
                message,
                buttons: ['确定']
            });
            alert.present();
        }
    }
}

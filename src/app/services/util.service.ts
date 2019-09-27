import {Injectable} from '@angular/core';
import {ToastController, LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(public toastCtrl: ToastController,
                public loadingController: LoadingController) {
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
}

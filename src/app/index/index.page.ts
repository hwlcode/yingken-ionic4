import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {UtilService} from '../services/util.service';
import {ModalController, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {LoginPage} from '../login/login.page';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
    slides = [
        'http://cdn.gxyingken.com/banner_1.jpg?imageView2/2/w/720/q/60',
        'http://cdn.gxyingken.com/banner_2.jpg?imageView2/2/w/720/q/60',
    ];
    slideOpts = {
        autoplay: true,
        loop: true,
        // spaceBetween: -25,
        slidesPerView: 'auto',
        centeredSlides: true,
    };
    infiniteScroll: any = null;
    products: any;
    errorMessage: any;
    last = false;
    page = 1;

    constructor(public productsService: ProductsService,
                public navCtrl: NavController,
                public storage: Storage,
                public modalCtrl: ModalController,
                public utilService: UtilService) {
    }

    async ngOnInit() {
        const loading = await this.utilService.showLoading();
        this.getProductList('', 1)
            .subscribe(
                async data => {
                    loading.dismiss();
                    if (data.code === 0) {
                        this.products = data.data;
                    }
                },
                error => {
                    this.errorMessage = error as any;
                    this.utilService.showToast(error);
                    // console.log(error);
                });
    }

    getProductList(keywords, page) {
        return this.productsService.getProductList(keywords, page);
    }

    goToDetail(product) {
        this.navCtrl.navigateForward(['/detail'], {
            queryParams: {
                id: product._id
            }
        });
    }

     login() {
        this.storage.get('user').then(
            async user => {
                if (user != null) {
                    this.navCtrl.navigateRoot('/tabs/profile');
                } else {
                    const loginModal = await this.modalCtrl.create({
                        component: LoginPage
                    });
                    loginModal.present();
                }
            });
    }

    goToProductList($event) {
        this.navCtrl.navigateRoot('/tabs/mall');
    }

    async doRefresh(refresher) {
        this.page = 1;
        const loading = await this.utilService.showLoading();
        this.getProductList('', this.page)
            .subscribe(
                data => {
                    if (data.code === 0) {
                        this.last = data.isLast;
                        this.products = data.data;
                        if (this.infiniteScroll) {
                            this.infiniteScroll.target.disabled = false;
                        }
                        refresher.target.complete();
                    }
                    loading.dismiss();
                },
                error => {
                    this.errorMessage = error as any;
                    this.utilService.showToast(error);
                });
    }

    async doInfinite(infiniteScroll) {
        this.page++;
        this.infiniteScroll = infiniteScroll;

        const loading = await this.utilService.showLoading();
        this.getProductList('', this.page)
            .subscribe(data => {
                    if (data.code === 0) {
                        this.last = data.isLast;
                        this.products = this.products.concat(data.data);
                        this.products.concat(data.data);
                        infiniteScroll.target.complete();
                        if (this.last) {
                            infiniteScroll.target.disabled = true;
                        }
                    }
                    loading.dismiss();
                },
                error => {
                    this.errorMessage = error as any;
                    this.utilService.showToast(error);
                });
    }
}

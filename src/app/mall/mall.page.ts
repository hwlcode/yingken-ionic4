import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {UtilService} from '../services/util.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-mall',
    templateUrl: './mall.page.html',
    styleUrls: ['./mall.page.scss'],
})
export class MallPage implements OnInit {
    infiniteScroll: any;
    products: any;
    errorMessage: any;
    keywords: string;
    last = false;
    page = 1;

    constructor(public productsService: ProductsService,
                public utilService: UtilService,
                public navCtrl: NavController) {
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

    search() {
        this.getProductList(this.keywords, 1)
            .subscribe(data => {
                if (data.code === 0) {
                    this.products = data.data;
                }
            }, error => {
                this.errorMessage = error;
                console.log(error);
            });
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

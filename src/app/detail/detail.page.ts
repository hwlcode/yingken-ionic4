import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, NavController} from '@ionic/angular';
import {ProductsService} from '../services/products.service';
import {UtilService} from '../services/util.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
    @ViewChild(IonContent, {static: false}) content: IonContent;

    id: string;  // id

    title: string; // 标题
    banner: string; // 图片
    price: string; // 价格
    unit: string; // 单位
    originPrice: string;
    originPriceUnit: string;
    desc: string; // 详情

    errorMsg: any; // 日志
    product: any; // 当前产品
    products: any; // 猜你喜欢

    proNum = 0; // 产品数量
    userId: string; // 当前用户Id
    sum: number; // 订单总价


    constructor(public productService: ProductsService,
                public activeRoute: ActivatedRoute,
                public productsService: ProductsService,
                public navCtrl: NavController,
                public router: Router,
                public utilService: UtilService) {
        this.activeRoute.queryParams.subscribe(params => {
            this.id = params.id;
        });
    }

    ngOnInit() {
        this.getProduct();
        this.getProducts();
    }

    async getProduct() {
        const loading = await this.utilService.showLoading();
        this.getProductById(this.id)
            .subscribe(
                data => {
                    if (data.code === 0) {
                        this.title = data.data.name;
                        this.banner = data.data.banner.path;
                        this.price = data.data.price;
                        this.unit = data.data.unit;
                        this.originPrice = data.data.origin_price;
                        this.originPriceUnit = data.data.origin_price_unit;
                        this.desc = data.data.desc;

                        this.product = data.data;
                    }
                    loading.dismiss();
                },
                error => {
                    this.errorMsg = error;
                });
    }

    getProductById(id) {
        return this.productService.getProductById(id);
    }

    getProducts() {
        this.getProductList('', 1)
            .subscribe(
                data => {
                    if (data.code === 0) {
                        this.products = data.data.splice(0, 4);
                    }
                },
                error => {
                    this.errorMsg = error;
                });
    }

    getProductList(keywords, page) {
        return this.productsService.getProductList(keywords, page);
    }

    goToDetail(id) {
        this.id = id;
        this.getProduct();
        this.content.scrollToTop(0);
        this.router.navigate(['/detail'], {
            queryParams: {id: id},
            relativeTo: this.activeRoute
        });
    }

}

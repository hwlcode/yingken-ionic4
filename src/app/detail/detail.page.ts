import {Component, OnInit, ViewChild} from '@angular/core';
import {Events, IonContent, ModalController, NavController} from '@ionic/angular';
import {ProductsService} from '../services/products.service';
import {UtilService} from '../services/util.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {LoginPage} from '../login/login.page';

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

    isLogin = false;
    cartNum = 0;

    constructor(public productService: ProductsService,
                public activeRoute: ActivatedRoute,
                public productsService: ProductsService,
                public navCtrl: NavController,
                public router: Router,
                public events: Events,
                public storage: Storage,
                public modalCtrl: ModalController,
                public utilService: UtilService) {
        this.activeRoute.queryParams.subscribe(params => {
            this.id = params.id;
        });
        // 订阅模式：不适合在页面间通知，只适合在同一个页面，因为这里还有buynow,所以需要订阅一下
        this.events.subscribe('user:login', (user, hasLogin) => {
            this.userId = user._id;
            this.isLogin = hasLogin;
        });
        // 本地存储的方式：适用于不同的页面间通知,接受tab那边登录过，这里需要去本地存储当中取出登录状态
        this.storage.get('user').then(
            val => {
                if (val !== null) {
                    this.isLogin = true;
                    this.userId = val._id;
                }
            }
        );

        this.events.subscribe('cart:add', (cart) => {
            let n = 0;
            cart.map(item => {
                n += item.num;
            });
            this.cartNum = n;
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
        this.proNum = 0;
        this.getProduct();
        this.content.scrollToTop(0);
        this.router.navigate(['/detail'], {
            queryParams: {id},
            relativeTo: this.activeRoute
        });
    }

    async addToCart(product) {
        if (!this.isLogin) {
            const loginModal = await this.modalCtrl.create({
                component: LoginPage
            });
            loginModal.present();
            return;
        } else {
            if (this.proNum === undefined || this.proNum === 0) {
                this.utilService.showToast('请添加购买的数量');
                return false;
            } else {
                let orders: Array<any> = [];
                const order: object = {};

                (order as any).product = product;
                (order as any).num = this.proNum;
                orders.push(order);

                this.storage.get('cart').then(
                    cart => {
                        if (cart == null) {
                            // 购物车为空
                            this.storage.set('cart', orders);
                            this.events.publish('cart:add', orders);
                            this.utilService.showToast('商品己经成功添加到购物车');
                        } else {
                            // 购物车不为空
                            orders = cart;
                            const isExist = JSON.stringify(cart).indexOf(product._id) !== -1;

                            if (!isExist) {
                                // 商品在购物车不存在
                                orders.push(order);
                                this.storage.set('cart', orders);
                                this.events.publish('cart:add', orders);
                                this.utilService.showToast('商品己经成功添加到购物车');
                            } else {
                                this.utilService.showToast('购物车中己经存在该商品，无需重复添加');
                            }
                        }
                    }
                );
            }
        }
    }

    async buyNow(product) {
        if (!this.isLogin) {
            const loginModal = await this.modalCtrl.create({
                component: LoginPage
            });
            loginModal.present();
            return;
        } else {
            if (this.proNum === undefined || this.proNum === 0) {
                this.utilService.showToast('请添加购买的数量');
                return false;
            } else {
                const orders: Array<any> = [];
                const order: object = {};

                (order as any).product = product;
                (order as any).num = this.proNum;
                orders.push(order);

                this.sum = product.price * this.proNum;

                // 生成订单
                // this.orderService.httpPostOrder({
                //     products: JSON.stringify(orders),
                //     sumPrice: this.sum,
                //     customer: this.userId
                // }).subscribe(res => {
                //     if (res.code === 0) {
                //         this.navCtrl.push(ConfirmOrderPage, {
                //             orders: orders,
                //             sn: res.data.no,  // 订单号 YK23423424234
                //             no: res.data.sn   // 订单编号
                //         });
                //     }
                // });
            }
        }
    }

    goToCart() {
        this.navCtrl.navigateRoot('/tabs/cart');
    }

    chooseProduct(e, product) {
    }
}

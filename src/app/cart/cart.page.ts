import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {Events, IonContent, ModalController, NavController} from '@ionic/angular';
import {LoginPage} from '../login/login.page';
import {UtilService} from '../services/util.service';
import {OrderService} from '../services/order.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    @ViewChild(IonContent, {static: false}) content: IonContent;
    products: any;
    errorMsg: any;
    cart = [];
    sum: any = 0.00;
    userId: null;

    constructor(public productsService: ProductsService,
                public storage: Storage,
                public modalCtrl: ModalController,
                public navCtrl: NavController,
                public events: Events,
                public utilService: UtilService,
                public orderService: OrderService,
                public router: Router) {
        this.storage.get('user').then(
            async user => {
                if (user == null) {
                    const loginModal = await this.modalCtrl.create({
                        component: LoginPage
                    });
                    loginModal.present();
                    this.navCtrl.navigateRoot('/tabs/index');
                } else {
                    // console.log(user);
                    this.userId = user._id;
                }
            });

        this.events.subscribe('cart:add', (cart) => {
            this.getSum(cart);
            this.cart = cart;
        });
        this.storage.get('cart').then(cart => {
            if (cart != null) {
                this.getSum(cart);
                this.cart = cart;
            }
        });
    }

    ionViewDidEnter() {
        this.content.scrollToTop(0);
    }

    ngOnInit() {
        this.getProducts();
    }

    getSum(cart) {
        let p = 0;
        for (let i = 0; i < cart.length; i++) {
            p += (cart[i].num ? cart[i].num : 0) * cart[i].product.price;
        }
        this.sum = p.toFixed(2);
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
        this.router.navigate(['/detail'], {
            queryParams: {id},
        });
    }

    chooseProduct() {
        this.getSum(this.cart);
    }

    clearCart() {
        this.storage.remove('cart');
        this.cart = [];
        this.events.publish('cart:add', []);
    }

    buyNow() {
        if (this.sum === 0) {
            this.utilService.showToast('您没有需要支付的产品');
        } else {
            // 生成订单
            this.orderService.httpPostOrder({
                products: JSON.stringify(this.cart),
                sumPrice: this.sum,
                customer: this.userId
            }).subscribe(res => {
                if (res.code === 0) {
                    this.storage.set('orders', this.cart);
                    this.storage.set('sn', res.data.no); // 订单号 YK23423424234
                    this.storage.set('no', res.data.sn); // 订单编号
                    this.navCtrl.navigateForward('/pay-order');
                }
            });
        }
    }

}

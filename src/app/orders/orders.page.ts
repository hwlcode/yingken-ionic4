import {Component, OnInit} from '@angular/core';
import {LoginPage} from '../login/login.page';
import {Storage} from '@ionic/storage';
import {ModalController, NavController} from '@ionic/angular';
import {OrderService} from '../services/order.service';
import {UtilService} from '../services/util.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.page.html',
    styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
    infiniteScroll: any;
    orders: Array<any> = [];
    userId: string;
    selected = 0;
    page = 1;
    errorMessage: any;
    last = false;

    constructor(public storage: Storage,
                public modalCtrl: ModalController,
                public navCtrl: NavController,
                public utilService: UtilService,
                public activeRoute: ActivatedRoute,
                public ordersService: OrderService) {
        this.activeRoute.queryParams.subscribe(params => {
            // console.log(params);
            if (params.selectedTab !== undefined) {
                this.selected = params.selectedTab;
            }
        });
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
                    this.getOrderList(this.selected);
                }
            });
    }

    ngOnInit() {

    }

    segmentChanged(e) {
        this.selected = e.detail.value;
        // 初始化分页
        this.last = false;
        this.page = 1;
        if (this.infiniteScroll !== undefined) {
            this.infiniteScroll.target.disabled = false;
        }
        this.getOrderList(e.detail.value);
    }

    getOrderList(status) {
        this.ordersService.httpGetOrderById(this.userId).subscribe(res => {
            if (res.code === 0) {
                this.orders = res.orders;
                if (status == 0) {
                    this.orders = this.orders.filter(item => {
                        return item.status == 0;
                    });
                } else if (status == 1) {
                    this.orders = this.orders.filter(item => {
                        return item.status == 1;
                    });
                } else if (status == 2) {
                    this.orders = this.orders.filter(item => {
                        return item.status == 2;
                    });
                } else if (status == 3) {
                    this.orders = this.orders.filter(item => {
                        return item.status != 1000;
                    });
                }

                this.orders.map(order => {
                    order.products = JSON.parse(order.products);
                    if (order.status === 0) {
                        order.orderStatusText = '待支付';
                    } else if (order.status === 1) {
                        order.orderStatusText = '己付款，待发货';
                    } else if (order.status === 2) {
                        order.orderStatusText = '己发货';
                    } else if (order.status === 1000) {
                        order.orderStatusText = '己删除';
                    }
                });
            }
        });
    }

    goToPay(order) {
        // console.log(order);
        this.storage.set('orders', order.products);
        this.storage.set('sn', order.sn); // 订单号 YK23423424234
        this.storage.set('no', order._id); // 订单编号
        this.navCtrl.navigateForward('/pay-order');
    }

    delOrder(id) {
        this.utilService.alert('确认删除该订单？', (data) => {
            this.ordersService.httpDelOrder(id).subscribe(res => {
                if (res.code === 0) {
                    this.getOrderList(this.selected);
                } else {
                    this.getOrderList(this.selected);
                    this.utilService.showToast(res.msg);
                }
            });
        });
    }

    async doInfinite(infiniteScroll) {
        this.page++;
        this.infiniteScroll = infiniteScroll;

        const loading = await this.utilService.showLoading();
        this.ordersService.httpGetOrderById(this.userId, this.page)
            .subscribe(res => {
                    if (res.code === 0) {
                        this.orders = this.orders.concat(res.orders);
                        this.orders.map(order => {
                            // console.log(typeof order.products);
                            if (typeof order.products === 'string') {
                                order.products = JSON.parse(order.products);
                            }
                            if (order.status === 0) {
                                order.orderStatusText = '待支付';
                            } else if (order.status === 1) {
                                order.orderStatusText = '己付款，待发货';
                            } else if (order.status === 2) {
                                order.orderStatusText = '己发货';
                            } else if (order.status === 1000) {
                                order.orderStatusText = '己删除';
                            }
                        });
                        this.last = res.isLast;
                        if (this.selected == 0) {
                            this.orders = this.orders.filter(item => {
                                return item.status == 0;
                            });
                        } else if (this.selected == 1) {
                            this.orders = this.orders.filter(item => {
                                return item.status == 1;
                            });
                        } else if (this.selected == 2) {
                            this.orders = this.orders.filter(item => {
                                return item.status == 2;
                            });
                        } else if (this.selected == 3) {
                            this.orders = this.orders.filter(item => {
                                return item.status != 1000;
                            });
                        }
                        // console.log(this.orders);
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

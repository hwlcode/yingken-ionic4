import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {OrderService} from '../services/order.service';
import {Storage} from '@ionic/storage';
import {ActivatedRoute} from '@angular/router';
import {UtilService} from '../services/util.service';
import {ProductsService} from '../services/products.service';
import {AlertController, NavController} from '@ionic/angular';
import {MessagesService} from '../services/messages.service';
import {PayService} from '../services/pay.service';
import {WechatService} from '../services/wechat.service';

@Component({
    selector: 'app-pay-order',
    templateUrl: './pay-order.page.html',
    styleUrls: ['./pay-order.page.scss'],
})
export class PayOrderPage implements OnInit {
    address: any = null;
    name: string;
    phone: string;
    no: string;
    sn: string;
    userId: string;

    adminId: string;
    adminPhone: string;

    orders: any = [];
    subject: any = '盈垦商品付款';
    body: any = '盈垦-商品付款';
    sum: any = 0;

    hasPay = false;
    payway = 1;
    code: string;
    openId: string;

    constructor(public userService: UserService,
                public ordersService: OrderService,
                public storage: Storage,
                public utilService: UtilService,
                public productsService: ProductsService,
                public navCtrl: NavController,
                public notificationService: MessagesService,
                public payService: PayService,
                public alertController: AlertController,
                public activeRoute: ActivatedRoute,
                public wechatService: WechatService) {
        this.storage.get('orders').then(orders => {
            if (orders != null) {
                this.orders = orders;
                this.getSum(orders);
            }
        });
        this.storage.get('no').then(no => {
            if (no != null) {
                this.no = no;
            }
        });
        this.storage.get('sn').then(sn => {
            if (sn != null) {
                this.sn = sn;
            }
        });
        // this.activeRoute.queryParams.subscribe(params => {
        //     this.orders = params.orders;
        //     this.no = params.no;
        //     this.sn = params.sn;
        //
        //     this.getSum(params.orders);
        // });
        // 商品中途下架
        this.orders.map(item => {
            this.productsService.getProductById(item.product._id)
                .subscribe(data => {
                    if (data.data.pro_status !== 0) {
                        this.utilService.showToast(data.data.name + '己下架或删除，请重新下单！');
                    }
                });
        });
    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        // 用户信息
        this.storage.get('user').then(user => {
            if (user != null) {
                this.userId = user._id;
                this.getDefaultAddress(user._id);
            }
        });
        // 商家信息
        this.userService.httpGetAdminId().subscribe(res => {
            if (res.code === 0) {
                this.adminId = res.data._id;
                this.adminPhone = res.data.phone;
            }
        });


        // 公众号支付：获取code
        if (window.location.href.indexOf('code') !== -1) {
            this.activeRoute.queryParams.subscribe(params => {
                this.code = params.code;
                this.getOpenId(params.code);
            });
        }
    }

    // 计算总价
    getSum(orders) {
        let p = 0;
        for (let i = 0; i < orders.length; i++) {
            p += (orders[i].num ? orders[i].num : 0) * orders[i].product.price;

            // this.subject += '盈垦商品付款';
            // this.body = '盈垦商品付款';
        }
        this.sum = p.toFixed(2);
    }

    // 默认收货地址
    getDefaultAddress(userId) {
        this.userService.getDefaultUserAddress(userId).subscribe(
            res => {
                if (res.code === 0) {
                    if (res.data != null) {
                        this.address = res.data.address;
                        this.name = res.data.name;
                        this.phone = res.data.phone;
                        this.changeAddress(this.no, res.data._id);
                    }
                }
            }
        );
    }

    // 更改用户收货地址数据
    changeAddress(sn, addressId) {
        this.ordersService.httpChangeAddress(sn, addressId).subscribe(
            data => {
                if (data.code === 0) {
                    // console.log(data.msg);
                }
            }
        );
    }

    // 更改用户收货地址
    selectAddress() {
        this.navCtrl.navigateForward('/address');
    }

    // 改变订单状态
    changeOrderStatus(payWay) {
        this.ordersService.httpUpdateOrderById(this.no, payWay).subscribe(
            res => {
                if (res.code === 0) {
                    this.navCtrl.navigateForward('/orders');
                }
            }
        );
    }

    // 给用户发送通知
    userOrderNotification(opts) {
        this.notificationService.createNotification(opts).subscribe(
            res => {
                if (res.code === 0) {
                    // console.log('success');
                }
            }
        );
    }

    // 短信通知商家发货
    msgToBusiness(phone, sn) {
        this.notificationService.msgToBusiness(phone, sn).subscribe(
            data => {
                if (data.code === 0) {
                    // console.log('success');
                }
            }
        );
    }

    // 更新完成支付时间
    changePayDate(sn) {
        this.ordersService.httpChangePayDate(sn).subscribe(
            data => {
                if (data.code === 0) {
                    // console.log(data.msg);
                }
            }
        );
    }

    confirmPay() {
        // 商品中途下架
        this.orders.map(item => {
            this.productsService.getProductById(item.product._id)
                .subscribe(data => {
                    // console.log(data.data.pro_status, data.data.price, item.product.price);
                    if (data.data.pro_status != 0 || data.data.price != item.product.price) {
                        this.utilService.showToast(data.data.name + '商品信息己变更，请重新下单！');
                    } else {
                        if (this.address == null) {
                            this.utilService.showToast('请选择收货地址！');
                        } else {
                            if (this.payway === 1) {
                                const ua = navigator.userAgent.toLowerCase(); // 获取判断用的对象
                                const uaMatch: any = ua.match(/MicroMessenger/i);
                                if (uaMatch == 'micromessenger') {
                                    // 公众号支付
                                    // 获取wx code： 公众号支付必须
                                    const wxappid = 'wxb80d00a17cb6631d';
                                    const returnUri = encodeURIComponent('http://wap.gxyingken.com/pay-order');
                                    const scope = 'snsapi_userinfo';
                                    const oauthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';
                                    const url = `${oauthUrl}?appid=${wxappid}&redirect_uri=${returnUri}&response_type=code&scope=${scope}&state=123#wechat_redirect`;

                                    window.location.href = url;
                                }
                            }
                        }
                    }
                });
        });
    }

    getOpenId(code) {
        this.payService.getOpenId(code).subscribe(
            res => {
                this.openId = res.openid;
                this.payOurMoney();
            });
    }

    payOurMoney() {
        const self = this;
        const openid = this.openId;
        const params = {
            attach: self.subject, // 订单标题
            body: self.body, // 订单描述
            out_trade_no: self.sn, // 订单号
            total_fee: self.sum, // 订单金额
            // total_fee: 0.01, // 订单金额
        };
        this.payService.creatWxpayOrder(params, openid).subscribe(
            async res => {
                const data = res;
                this.wechatService.wexinPay(data).then(async () => {
                    const alert = await this.alertController.create({
                        header: '确认支付结果',
                        buttons: [
                            {
                                text: '支付遇到问题',
                                handler: () => {
                                    this.orderQuery(alert);
                                    // alert.dismiss();
                                }
                            },
                            {
                                text: '己完成支付',
                                handler: () => {
                                    this.orderQuery(alert);
                                }
                            }
                        ]
                    });
                    await alert.present();
                });
            },
            err => {
                this.utilService.showToast(err);
            });
    }

    orderQuery(alert) {
        const self = this;
        this.payService.orderQuery(this.sn).subscribe(data => {
            // console.log(data);

            // @ts-ignore
            if (data.return_code == 'SUCCESS') {
                const opts = {
                    content: '您收到新的订单：' + self.sn + ' 请尽快处理！',
                    from: self.userId,
                    to: self.adminId // 管理员ID
                };
                // 给用户发送通知
                self.userOrderNotification(opts);

                // 通知商家发货
                self.msgToBusiness(self.adminPhone, self.sn);

                // 用户收到下单通知
                const businessOpts = {
                    content: '您的订单：' + self.sn + ' 己经生成，我们会尽快为您发货！非常感谢您的订购，祝生活愉快！电话咨询：18078660058',
                    from: self.adminId, // 管理员ID
                    to: self.userId
                };
                self.userOrderNotification(businessOpts);

                // 改变订单状态 status=1
                self.changeOrderStatus(self.payway);

                // 获取支付时间
                self.changePayDate(self.sn);

                // 禁用按钮
                self.hasPay = true;
            } else {
                this.utilService.showToast(data.data.msg);
            }
            alert.dismiss();
            this.navCtrl.navigateForward('/orders', {
                queryParams: {
                    selectedTab: 1
                }
            });
            // 清除购物车
            this.storage.remove('cart');
            this.storage.remove('orders');
            this.storage.remove('sn');
            this.storage.remove('no');
        });
    }
}

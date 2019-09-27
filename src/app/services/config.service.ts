import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    DOMAIN = 'http://admin.gxyingken.com/api/';            // 后台Api地址

    API = {
        getBanner: 'web/banners',
        // getProducts: 'productList',
        getProductById: 'app/product',
        verifyCode: 'verifyCode',
        profile: 'profile',
        login: 'user/login',
        upload: 'upload',
        uploadAvatar: 'upload/avatar',
        // products: 'web/productList',
        saveProfile: 'saveProfile',
        search: 'products/list',  // 统一用这个来取产品列表
        orderAdd: 'order/add',
        orderList: 'order/list',
        updateOrder: 'order/confirm_order',
        userNotificationList: 'notification',
        delUserNotification: 'notification/delete',
        readUserNotification: 'notification/read',
        unReadUserNotification: 'notification/unread',
        postAddress: 'user/address',
        userAddress: 'user/address-list',
        changeDefaultAddress: 'user/address/be-default',
        delUserAddress: 'user/del-address',
        defaultAddress: 'user/default-address',
    };

    constructor() {
    }
}

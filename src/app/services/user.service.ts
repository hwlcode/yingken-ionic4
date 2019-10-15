import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {
    PostAccessTokenRequest,
    PostAddressRequest,
    PostAvatarRequest,
    PostBirthRequest,
    PostNameRequest,
    PostSexRequest
} from '../../message/user.request';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(public http: HttpClient,
                public globalConfig: ConfigService) {
    }

    // 用户登录
    httpPost(request: PostAccessTokenRequest): Observable<any> {
        return this.http.post(this.globalConfig.DOMAIN + this.globalConfig.API.login, request);
    }

    // 获取用户信息
    httpGetUser(id: string): Observable<any> {
        return this.http.get(this.globalConfig.DOMAIN + this.globalConfig.API.profile + '?id=' + id);
    }

    // 更新头像
    httpPostAvatar(request: PostAvatarRequest): Observable<any> {
        return this.http.post(this.globalConfig.DOMAIN + this.globalConfig.API.saveProfile, request);
    }

    // 更新姓名
    httpPostName(request: PostNameRequest): Observable<any> {
        return this.http.post(this.globalConfig.DOMAIN + this.globalConfig.API.saveProfile, request);
    }

    // 更新性别
    httpPostSex(request: PostSexRequest): Observable<any> {
        return this.http.post(this.globalConfig.DOMAIN + this.globalConfig.API.saveProfile, request);
    }

    // 更新生日
    httpPostBirth(request: PostBirthRequest): Observable<any> {
        return this.http.post(this.globalConfig.DOMAIN + this.globalConfig.API.saveProfile, request);
    }

    // 更新收货地址
    httpPostAddress(request: PostAddressRequest): Observable<any> {
        return this.http.post(this.globalConfig.DOMAIN + this.globalConfig.API.postAddress, request);
    }

    // 用户收货地址
    getHttpUserAddress(userId: string): Observable<any> {
        return this.http.get(this.globalConfig.DOMAIN + this.globalConfig.API.userAddress + '?userId=' + userId);
    }

    // 更新默认收货地址
    changeUserDefaultAddress(userId: string, addressId: string): Observable<any> {
        return this.http.get(this.globalConfig.DOMAIN + this.globalConfig.API.changeDefaultAddress + '?userId=' + userId + '&addressId=' + addressId);
    }

    // 删除收货地址
    delUserAddress(id: string): Observable<any> {
        return this.http.get(this.globalConfig.DOMAIN + this.globalConfig.API.delUserAddress + '?id=' + id);
    }

    // 获取用户默认收货地址
    getDefaultUserAddress(userId: string): Observable<any> {
        return this.http.get(this.globalConfig.DOMAIN + this.globalConfig.API.defaultAddress + '?userId=' + userId);
    }

    // 获取验证码
    httpGetVerifyCode(phone: string): Observable<any> {
        return this.http.get(this.globalConfig.DOMAIN + this.globalConfig.API.verifyCode + '?phone=' + phone);
    }

    // 获取商家信息（管理员）
    httpGetAdminId(): Observable<any> {
        return this.http.get(this.globalConfig.DOMAIN + 'get_admin_id');
    }
}

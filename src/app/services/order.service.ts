import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CodeRequest, OrderRequest} from '../../message/order.request';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(public http: HttpClient,
                public config: ConfigService) {
    }

    httpPostOrder(request: OrderRequest): Observable<any> {
        return this.http.get(this.config.DOMAIN + this.config.API.orderAdd + '?products=' + request.products + '&sumPrice=' + request.sumPrice + '&customer=' + request.customer);
    }

    httpGetOrderById(id: string): Observable<any> {
        return this.http.get(this.config.DOMAIN + this.config.API.orderList + '?id=' + id);
    }

    httpUpdateOrderById(id: string, payWay: number): Observable<any> {
        return this.http.get(this.config.DOMAIN + this.config.API.updateOrder + '/' + id + '/' + payWay);
    }

    httpPostCode(request: CodeRequest): Observable<any> {
        return this.http.post(this.config.DOMAIN + 'update_code', request);
    }

    httpDelOrder(id: string): Observable<any> {
        return this.http.get(this.config.DOMAIN + 'order/del/' + id);
    }

    httpChangeAddress(sn: string, addressId: string): Observable<any> {
        return this.http.get(this.config.DOMAIN + 'order/change-address/' + sn + '/' + addressId);
    }

    httpChangePayDate(sn: string): Observable<any> {
        return this.http.get(this.config.DOMAIN + 'wx_pay/' + sn);
    }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {payInfoRequest, payWxPayInfoRequest} from '../../message/pay.request';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PayService {

    constructor(public http: HttpClient,
                public config: ConfigService) {
    }

    postPayInfo(request: payInfoRequest): Observable<any> {
        return this.http.get(this.config.DOMAIN + 'pay_info?subject=' + request.subject + '&body=' + request.body + '&amount=' + request.amount + '&outTradeId=' + request.outTradeId);
    }

    queryOrder(sn: string, tradeId: string): Observable<any> {
        return this.http.get(this.config.DOMAIN + 'query_order?sn=' + sn + '&trade_id=' + tradeId);
    }

    postWxPay(request: payWxPayInfoRequest): Observable<any> {
        return this.http.post(this.config.DOMAIN + 'wx_pay/order', request);
    }

    getOpenId(code: string): Observable<any> {
        return this.http.get(this.config.DOMAIN + 'pay/wx_pay/getOpenId?code=' + code);
    }

    creatWxpayOrder(request: payWxPayInfoRequest, openid: string): Observable<any> {
        return this.http.get(this.config.DOMAIN + 'pay/wx_pay/order?openid=' + openid + '&attach=' + request.attach + '&body=' + request.body + '&total_fee=' + request.total_fee + '&out_trade_no=' + request.out_trade_no);
    }

    orderQuery(sn: string): Observable<any> {
        return this.http.get(this.config.DOMAIN + 'pay/wx_pay/public/orderQuery?out_trade_no=' + sn);
    }
}

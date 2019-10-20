import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {NotificationRequest} from '../../message/notification.request';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    constructor(public http: HttpClient,
                public config: ConfigService) {
    }

    getUserNotificationList(userId: string): Observable<any> {
        return this.http.get(this.config.DOMAIN + this.config.API.userNotificationList + '?id=' + userId);
    }

    delUserNotification(id: string, userId: string): Observable<any> {
        return this.http.get(this.config.DOMAIN + this.config.API.delUserNotification + '?id=' + id + '&userId=' + userId);
    }

    readUserNotification(id: string, userId: string): Observable<any> {
        return this.http.get(this.config.DOMAIN + this.config.API.readUserNotification + '?id=' + id + '&userId=' + userId);
    }

    unReadUserNotification(id: string): Observable<any> {
        return this.http.get(this.config.DOMAIN + this.config.API.unReadUserNotification + '?id=' + id);
    }

    createNotification(request: NotificationRequest): Observable<any> {
        return this.http.get(this.config.DOMAIN + 'notification/create/' + request.content + '/' + request.from + '/' + request.to);
    }

    msgToBusiness(phone: string, no: string): Observable<any> {
        return this.http.get(this.config.DOMAIN + 'msg_to_business?phone=' + phone + '&no=' + no);
    }
}

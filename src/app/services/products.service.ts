import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(public http: HttpClient,
                public config: ConfigService) {
    }

    getProductList(keywords: string, page: number): Observable<any> {
        return this.http.get(this.config.DOMAIN + this.config.API.search + '?keywords=' + keywords + '&page=' + page);
    }

    getProductById(id: string): Observable<any> {
        return this.http.get(this.config.DOMAIN + this.config.API.getProductById + '/' + id);
    }
}

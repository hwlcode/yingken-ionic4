import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    products: any;
    errorMsg: any;

    constructor(public productsService: ProductsService,
                public router: Router) {
    }

    ngOnInit() {
        this.getProducts();
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
            // relativeTo: this.activeRoute
        });
    }

}

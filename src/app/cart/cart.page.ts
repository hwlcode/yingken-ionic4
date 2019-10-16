import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {Events} from '@ionic/angular';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    products: any;
    errorMsg: any;
    cart = [];
    sum: any = 0.00;

    constructor(public productsService: ProductsService,
                public storage: Storage,
                public events: Events,
                public router: Router) {
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

}

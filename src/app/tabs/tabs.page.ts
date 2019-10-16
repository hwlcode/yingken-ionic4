import {Component} from '@angular/core';
import {Events} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    cartNum = 0;

    constructor(public events: Events,
                public storage: Storage) {
        this.events.subscribe('cart:add', cart => {
            if (cart.length === 0) {
                this.cartNum = 0;
            } else {
                let n = 0;
                cart.map(item => {
                    n += item.num;
                });
                this.cartNum = n;
            }
        });
        this.storage.get('cart').then(
            cart => {
                if (cart !== null) {
                    let n = 0;
                    cart.map(item => {
                        n += item.num;
                    });
                    this.cartNum = n;
                }
            }
        );
    }

}

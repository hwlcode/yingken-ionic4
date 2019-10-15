import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {CartPage} from './cart.page';
import {GlobalModule} from '../modules/global/global.module';

const routes: Routes = [
    {
        path: '',
        component: CartPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        GlobalModule
    ],
    declarations: [CartPage]
})
export class CartPageModule {
}

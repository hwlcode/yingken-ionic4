import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {DetailPage} from './detail.page';
import {GlobalModule} from '../modules/global/global.module';

const routes: Routes = [
    {
        path: '',
        component: DetailPage
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [DetailPage]
})
export class DetailPageModule {
}

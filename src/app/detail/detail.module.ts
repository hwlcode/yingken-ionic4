import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DetailPage} from './detail.page';
import {CountComponent} from '../count/count.component';
import {RecommendedComponent} from '../recommended/recommended.component';

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
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [DetailPage, CountComponent, RecommendedComponent]
})
export class DetailPageModule {
}

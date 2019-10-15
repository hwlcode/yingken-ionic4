import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecommendedComponent} from '../../recommended/recommended.component';
import {CountComponent} from '../../count/count.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [   // 进行声明
        RecommendedComponent,
        CountComponent
    ],
    exports: [  // 进行导出
        RecommendedComponent,
        CountComponent,
    ]
})
export class GlobalModule {
}

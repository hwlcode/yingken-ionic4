import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import {LoginPage} from './login/login.page';
import {LoginPageModule} from './login/login.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
    ],
    entryComponents: [
        LoginPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
        LoginPageModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: LocationStrategy, useClass: HashLocationStrategy}, // 解决部署后刷新404问题
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

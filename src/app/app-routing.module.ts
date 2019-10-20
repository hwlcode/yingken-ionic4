import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'index', loadChildren: './index/index.module#IndexPageModule' },
  { path: 'mall', loadChildren: './mall/mall.module#MallPageModule' },
  { path: 'message', loadChildren: './message/message.module#MessagePageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'detail', loadChildren: './detail/detail.module#DetailPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' },
  { path: 'orders', loadChildren: './orders/orders.module#OrdersPageModule' },
  { path: 'address', loadChildren: './address/address.module#AddressPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'version', loadChildren: './version/version.module#VersionPageModule' },
  { path: 'add-address', loadChildren: './add-address/add-address.module#AddAddressPageModule' },
  { path: 'pay-order', loadChildren: './pay-order/pay-order.module#PayOrderPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

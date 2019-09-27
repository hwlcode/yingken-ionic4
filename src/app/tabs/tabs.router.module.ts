import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'index',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../index/index.module').then(m => m.IndexPageModule)
          }
        ]
      },
      {
        path: 'mall',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../mall/mall.module').then(m => m.MallPageModule)
          }
        ]
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../cart/cart.module').then(m => m.CartPageModule)
          }
        ]
      },
      {
        path: 'message',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../message/message.module').then(m => m.MessagePageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/index',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

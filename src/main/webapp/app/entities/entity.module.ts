import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'shopping-list',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingTwistShoppingListModule)
      },
      {
        path: 'shopper',
        loadChildren: () => import('./shopper/shopper.module').then(m => m.ShoppingTwistShopperModule)
      },
      {
        path: 'item',
        loadChildren: () => import('./item/item.module').then(m => m.ShoppingTwistItemModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.ShoppingTwistCategoryModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ShoppingTwistEntityModule {}

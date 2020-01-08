import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShoppingTwistSharedModule } from 'app/shared/shared.module';
import { ShopperComponent } from './shopper.component';
import { ShopperDetailComponent } from './shopper-detail.component';
import { ShopperUpdateComponent } from './shopper-update.component';
import { ShopperDeleteDialogComponent } from './shopper-delete-dialog.component';
import { shopperRoute } from './shopper.route';

@NgModule({
  imports: [ShoppingTwistSharedModule, RouterModule.forChild(shopperRoute)],
  declarations: [ShopperComponent, ShopperDetailComponent, ShopperUpdateComponent, ShopperDeleteDialogComponent],
  entryComponents: [ShopperDeleteDialogComponent]
})
export class ShoppingTwistShopperModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ShoppingTwistSharedModule } from 'app/shared/shared.module';
import { ShoppingTwistCoreModule } from 'app/core/core.module';
import { ShoppingTwistAppRoutingModule } from './app-routing.module';
import { ShoppingTwistHomeModule } from './home/home.module';
import { ShoppingTwistEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    ShoppingTwistSharedModule,
    ShoppingTwistCoreModule,
    ShoppingTwistHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ShoppingTwistEntityModule,
    ShoppingTwistAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class ShoppingTwistAppModule {}

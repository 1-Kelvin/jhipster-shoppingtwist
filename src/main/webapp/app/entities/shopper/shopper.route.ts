import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IShopper, Shopper } from 'app/shared/model/shopper.model';
import { ShopperService } from './shopper.service';
import { ShopperComponent } from './shopper.component';
import { ShopperDetailComponent } from './shopper-detail.component';
import { ShopperUpdateComponent } from './shopper-update.component';

@Injectable({ providedIn: 'root' })
export class ShopperResolve implements Resolve<IShopper> {
  constructor(private service: ShopperService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShopper> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((shopper: HttpResponse<Shopper>) => {
          if (shopper.body) {
            return of(shopper.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Shopper());
  }
}

export const shopperRoute: Routes = [
  {
    path: '',
    component: ShopperComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Shoppers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ShopperDetailComponent,
    resolve: {
      shopper: ShopperResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Shoppers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ShopperUpdateComponent,
    resolve: {
      shopper: ShopperResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Shoppers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ShopperUpdateComponent,
    resolve: {
      shopper: ShopperResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Shoppers'
    },
    canActivate: [UserRouteAccessService]
  }
];

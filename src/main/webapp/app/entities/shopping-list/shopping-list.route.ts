import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IShoppingList, ShoppingList } from 'app/shared/model/shopping-list.model';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListDetailComponent } from './shopping-list-detail.component';
import { ShoppingListUpdateComponent } from './shopping-list-update.component';

@Injectable({ providedIn: 'root' })
export class ShoppingListResolve implements Resolve<IShoppingList> {
  constructor(private service: ShoppingListService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShoppingList> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((shoppingList: HttpResponse<ShoppingList>) => {
          if (shoppingList.body) {
            return of(shoppingList.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ShoppingList());
  }
}

export const shoppingListRoute: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ShoppingLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ShoppingListDetailComponent,
    resolve: {
      shoppingList: ShoppingListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ShoppingLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ShoppingListUpdateComponent,
    resolve: {
      shoppingList: ShoppingListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ShoppingLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ShoppingListUpdateComponent,
    resolve: {
      shoppingList: ShoppingListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ShoppingLists'
    },
    canActivate: [UserRouteAccessService]
  }
];

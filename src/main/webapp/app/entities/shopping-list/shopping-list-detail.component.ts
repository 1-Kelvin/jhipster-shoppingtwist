import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShoppingList } from 'app/shared/model/shopping-list.model';

@Component({
  selector: 'jhi-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html'
})
export class ShoppingListDetailComponent implements OnInit {
  shoppingList: IShoppingList | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shoppingList }) => {
      this.shoppingList = shoppingList;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

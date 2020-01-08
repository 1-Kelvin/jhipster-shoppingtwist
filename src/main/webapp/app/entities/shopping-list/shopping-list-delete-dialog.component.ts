import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShoppingList } from 'app/shared/model/shopping-list.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  templateUrl: './shopping-list-delete-dialog.component.html'
})
export class ShoppingListDeleteDialogComponent {
  shoppingList?: IShoppingList;

  constructor(
    protected shoppingListService: ShoppingListService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.shoppingListService.delete(id).subscribe(() => {
      this.eventManager.broadcast('shoppingListListModification');
      this.activeModal.close();
    });
  }
}

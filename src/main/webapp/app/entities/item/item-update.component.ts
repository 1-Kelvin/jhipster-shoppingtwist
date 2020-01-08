import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IItem, Item } from 'app/shared/model/item.model';
import { ItemService } from './item.service';
import { IShoppingList } from 'app/shared/model/shopping-list.model';
import { ShoppingListService } from 'app/entities/shopping-list/shopping-list.service';

@Component({
  selector: 'jhi-item-update',
  templateUrl: './item-update.component.html'
})
export class ItemUpdateComponent implements OnInit {
  isSaving = false;

  shoppinglists: IShoppingList[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    price: [],
    quantity: [],
    description: [],
    shoppingList: []
  });

  constructor(
    protected itemService: ItemService,
    protected shoppingListService: ShoppingListService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ item }) => {
      this.updateForm(item);

      this.shoppingListService
        .query()
        .pipe(
          map((res: HttpResponse<IShoppingList[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IShoppingList[]) => (this.shoppinglists = resBody));
    });
  }

  updateForm(item: IItem): void {
    this.editForm.patchValue({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      description: item.description,
      shoppingList: item.shoppingList
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const item = this.createFromForm();
    if (item.id !== undefined) {
      this.subscribeToSaveResponse(this.itemService.update(item));
    } else {
      this.subscribeToSaveResponse(this.itemService.create(item));
    }
  }

  private createFromForm(): IItem {
    return {
      ...new Item(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      price: this.editForm.get(['price'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      description: this.editForm.get(['description'])!.value,
      shoppingList: this.editForm.get(['shoppingList'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItem>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IShoppingList): any {
    return item.id;
  }
}

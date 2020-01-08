import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IShoppingList, ShoppingList } from 'app/shared/model/shopping-list.model';
import { ShoppingListService } from './shopping-list.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';
import { IShopper } from 'app/shared/model/shopper.model';
import { ShopperService } from 'app/entities/shopper/shopper.service';

type SelectableEntity = ICategory | IShopper;

@Component({
  selector: 'jhi-shopping-list-update',
  templateUrl: './shopping-list-update.component.html'
})
export class ShoppingListUpdateComponent implements OnInit {
  isSaving = false;

  categories: ICategory[] = [];

  shoppers: IShopper[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    category: [],
    shopper: []
  });

  constructor(
    protected shoppingListService: ShoppingListService,
    protected categoryService: CategoryService,
    protected shopperService: ShopperService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shoppingList }) => {
      this.updateForm(shoppingList);

      this.categoryService
        .query({ filter: 'shoppinglist-is-null' })
        .pipe(
          map((res: HttpResponse<ICategory[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICategory[]) => {
          if (!shoppingList.category || !shoppingList.category.id) {
            this.categories = resBody;
          } else {
            this.categoryService
              .find(shoppingList.category.id)
              .pipe(
                map((subRes: HttpResponse<ICategory>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICategory[]) => {
                this.categories = concatRes;
              });
          }
        });

      this.shopperService
        .query()
        .pipe(
          map((res: HttpResponse<IShopper[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IShopper[]) => (this.shoppers = resBody));
    });
  }

  updateForm(shoppingList: IShoppingList): void {
    this.editForm.patchValue({
      id: shoppingList.id,
      name: shoppingList.name,
      category: shoppingList.category,
      shopper: shoppingList.shopper
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shoppingList = this.createFromForm();
    if (shoppingList.id !== undefined) {
      this.subscribeToSaveResponse(this.shoppingListService.update(shoppingList));
    } else {
      this.subscribeToSaveResponse(this.shoppingListService.create(shoppingList));
    }
  }

  private createFromForm(): IShoppingList {
    return {
      ...new ShoppingList(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      category: this.editForm.get(['category'])!.value,
      shopper: this.editForm.get(['shopper'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShoppingList>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}

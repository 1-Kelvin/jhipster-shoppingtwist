import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IShopper, Shopper } from 'app/shared/model/shopper.model';
import { ShopperService } from './shopper.service';

@Component({
  selector: 'jhi-shopper-update',
  templateUrl: './shopper-update.component.html'
})
export class ShopperUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    displayName: [],
    phoneNumber: []
  });

  constructor(protected shopperService: ShopperService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shopper }) => {
      this.updateForm(shopper);
    });
  }

  updateForm(shopper: IShopper): void {
    this.editForm.patchValue({
      id: shopper.id,
      displayName: shopper.displayName,
      phoneNumber: shopper.phoneNumber
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shopper = this.createFromForm();
    if (shopper.id !== undefined) {
      this.subscribeToSaveResponse(this.shopperService.update(shopper));
    } else {
      this.subscribeToSaveResponse(this.shopperService.create(shopper));
    }
  }

  private createFromForm(): IShopper {
    return {
      ...new Shopper(),
      id: this.editForm.get(['id'])!.value,
      displayName: this.editForm.get(['displayName'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShopper>>): void {
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
}

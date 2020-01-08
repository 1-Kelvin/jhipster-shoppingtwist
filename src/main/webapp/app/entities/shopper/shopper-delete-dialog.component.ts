import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShopper } from 'app/shared/model/shopper.model';
import { ShopperService } from './shopper.service';

@Component({
  templateUrl: './shopper-delete-dialog.component.html'
})
export class ShopperDeleteDialogComponent {
  shopper?: IShopper;

  constructor(protected shopperService: ShopperService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.shopperService.delete(id).subscribe(() => {
      this.eventManager.broadcast('shopperListModification');
      this.activeModal.close();
    });
  }
}

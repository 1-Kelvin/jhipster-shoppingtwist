import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShopper } from 'app/shared/model/shopper.model';
import { ShopperService } from './shopper.service';
import { ShopperDeleteDialogComponent } from './shopper-delete-dialog.component';

@Component({
  selector: 'jhi-shopper',
  templateUrl: './shopper.component.html'
})
export class ShopperComponent implements OnInit, OnDestroy {
  shoppers?: IShopper[];
  eventSubscriber?: Subscription;

  constructor(protected shopperService: ShopperService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.shopperService.query().subscribe((res: HttpResponse<IShopper[]>) => {
      this.shoppers = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInShoppers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IShopper): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInShoppers(): void {
    this.eventSubscriber = this.eventManager.subscribe('shopperListModification', () => this.loadAll());
  }

  delete(shopper: IShopper): void {
    const modalRef = this.modalService.open(ShopperDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shopper = shopper;
  }
}

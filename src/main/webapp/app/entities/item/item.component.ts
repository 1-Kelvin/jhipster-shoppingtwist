import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IItem } from 'app/shared/model/item.model';
import { ItemService } from './item.service';
import { ItemDeleteDialogComponent } from './item-delete-dialog.component';

@Component({
  selector: 'jhi-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit, OnDestroy {
  items?: IItem[];
  eventSubscriber?: Subscription;

  constructor(protected itemService: ItemService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.itemService.query().subscribe((res: HttpResponse<IItem[]>) => {
      this.items = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInItems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IItem): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('itemListModification', () => this.loadAll());
  }

  delete(item: IItem): void {
    const modalRef = this.modalService.open(ItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.item = item;
  }
}

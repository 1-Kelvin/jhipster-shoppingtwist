import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShopper } from 'app/shared/model/shopper.model';

@Component({
  selector: 'jhi-shopper-detail',
  templateUrl: './shopper-detail.component.html'
})
export class ShopperDetailComponent implements OnInit {
  shopper: IShopper | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shopper }) => {
      this.shopper = shopper;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

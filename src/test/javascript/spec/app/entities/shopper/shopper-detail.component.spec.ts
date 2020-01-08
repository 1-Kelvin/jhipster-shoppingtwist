import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShoppingTwistTestModule } from '../../../test.module';
import { ShopperDetailComponent } from 'app/entities/shopper/shopper-detail.component';
import { Shopper } from 'app/shared/model/shopper.model';

describe('Component Tests', () => {
  describe('Shopper Management Detail Component', () => {
    let comp: ShopperDetailComponent;
    let fixture: ComponentFixture<ShopperDetailComponent>;
    const route = ({ data: of({ shopper: new Shopper(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShoppingTwistTestModule],
        declarations: [ShopperDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ShopperDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShopperDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load shopper on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.shopper).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

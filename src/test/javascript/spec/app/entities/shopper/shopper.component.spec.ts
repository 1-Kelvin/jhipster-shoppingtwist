import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShoppingTwistTestModule } from '../../../test.module';
import { ShopperComponent } from 'app/entities/shopper/shopper.component';
import { ShopperService } from 'app/entities/shopper/shopper.service';
import { Shopper } from 'app/shared/model/shopper.model';

describe('Component Tests', () => {
  describe('Shopper Management Component', () => {
    let comp: ShopperComponent;
    let fixture: ComponentFixture<ShopperComponent>;
    let service: ShopperService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShoppingTwistTestModule],
        declarations: [ShopperComponent],
        providers: []
      })
        .overrideTemplate(ShopperComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShopperComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShopperService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Shopper(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.shoppers && comp.shoppers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ShoppingTwistTestModule } from '../../../test.module';
import { ShopperUpdateComponent } from 'app/entities/shopper/shopper-update.component';
import { ShopperService } from 'app/entities/shopper/shopper.service';
import { Shopper } from 'app/shared/model/shopper.model';

describe('Component Tests', () => {
  describe('Shopper Management Update Component', () => {
    let comp: ShopperUpdateComponent;
    let fixture: ComponentFixture<ShopperUpdateComponent>;
    let service: ShopperService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShoppingTwistTestModule],
        declarations: [ShopperUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ShopperUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShopperUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShopperService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Shopper(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Shopper();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

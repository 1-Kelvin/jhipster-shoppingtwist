import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShoppingTwistTestModule } from '../../../test.module';
import { ShoppingListDetailComponent } from 'app/entities/shopping-list/shopping-list-detail.component';
import { ShoppingList } from 'app/shared/model/shopping-list.model';

describe('Component Tests', () => {
  describe('ShoppingList Management Detail Component', () => {
    let comp: ShoppingListDetailComponent;
    let fixture: ComponentFixture<ShoppingListDetailComponent>;
    const route = ({ data: of({ shoppingList: new ShoppingList(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShoppingTwistTestModule],
        declarations: [ShoppingListDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ShoppingListDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShoppingListDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load shoppingList on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.shoppingList).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

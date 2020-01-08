import { ICategory } from 'app/shared/model/category.model';
import { IItem } from 'app/shared/model/item.model';
import { IShopper } from 'app/shared/model/shopper.model';

export interface IShoppingList {
  id?: number;
  name?: string;
  category?: ICategory;
  items?: IItem[];
  shopper?: IShopper;
}

export class ShoppingList implements IShoppingList {
  constructor(public id?: number, public name?: string, public category?: ICategory, public items?: IItem[], public shopper?: IShopper) {}
}

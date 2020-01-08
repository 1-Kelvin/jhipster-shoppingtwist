import { IShoppingList } from 'app/shared/model/shopping-list.model';

export interface IItem {
  id?: number;
  name?: string;
  price?: number;
  quantity?: number;
  description?: string;
  shoppingList?: IShoppingList;
}

export class Item implements IItem {
  constructor(
    public id?: number,
    public name?: string,
    public price?: number,
    public quantity?: number,
    public description?: string,
    public shoppingList?: IShoppingList
  ) {}
}

import { IShoppingList } from 'app/shared/model/shopping-list.model';

export interface IShopper {
  id?: number;
  displayName?: string;
  phoneNumber?: string;
  shoppingLists?: IShoppingList[];
}

export class Shopper implements IShopper {
  constructor(public id?: number, public displayName?: string, public phoneNumber?: string, public shoppingLists?: IShoppingList[]) {}
}

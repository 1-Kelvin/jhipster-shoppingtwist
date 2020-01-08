import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IShoppingList } from 'app/shared/model/shopping-list.model';

type EntityResponseType = HttpResponse<IShoppingList>;
type EntityArrayResponseType = HttpResponse<IShoppingList[]>;

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  public resourceUrl = SERVER_API_URL + 'api/shopping-lists';

  constructor(protected http: HttpClient) {}

  create(shoppingList: IShoppingList): Observable<EntityResponseType> {
    return this.http.post<IShoppingList>(this.resourceUrl, shoppingList, { observe: 'response' });
  }

  update(shoppingList: IShoppingList): Observable<EntityResponseType> {
    return this.http.put<IShoppingList>(this.resourceUrl, shoppingList, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IShoppingList>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShoppingList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

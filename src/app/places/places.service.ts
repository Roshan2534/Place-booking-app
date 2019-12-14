import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    // tslint:disable-next-line: max-line-length
    new Place('p1', 'Manhattan Mansion', 'In the heart of New York City', 'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 149.99, new Date('2019-01-01'), new Date('2019-12-31')),
    // tslint:disable-next-line: max-line-length
    new Place('p2', 'L\'Amour Toujours', 'A tourist place in paris', 'https://www.discoverwalks.com/blog/wp-content/uploads/2015/07/paris-at-night-big.jpg', 189.99, new Date('2019-01-01'), new Date('2019-12-31')),
    // tslint:disable-next-line: max-line-length
    new Place('p3', 'The Foggy Palace', 'Not your average city trip!', 'https://images.squarespace-cdn.com/content/v1/5a2537ab1f318dcca23b2a9a/1553072598968-EMRLUY4UVJJXSYH1HVTY/ke17ZwdGBToddI8pDm48kLS5BcfP_ie9JnHe-YTegBMUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dpfpxA3nkZv9VcDdtvE3KElcvuVhHM0TaJxLlL997ZSUm7cT0R_dexc_UL_zbpz6JQ/Bourscheid+Castle+in+the+fog+-+Chateau+de+Bourscheid+-+Luxembourg+-+Bourscheid+castle+in+the+fog+during+an+autumn+sunrise+-+Castle+Adrift+in+the+Valley+of+Fog+-+Photography+by+Christophe+Van+Biesen+-+Landscape+and+Travel+Photographer.jpg?format=1500w', 120.99, new Date('2019-01-01'), new Date('2019-12-31'))
  ];

  get places() {
    return [...this._places];
  }

  getPlace(id: string) {
    return {...this._places.find(p => p.id === id)};
  }

  constructor() { }
}

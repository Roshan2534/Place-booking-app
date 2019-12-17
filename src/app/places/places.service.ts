import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  // tslint:disable-next-line: variable-name
  private _places = new BehaviorSubject<Place[]>([
    // tslint:disable-next-line: max-line-length
    new Place('p1', 'Manhattan Mansion', 'In the heart of New York City', 'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 149.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
    // tslint:disable-next-line: max-line-length
    new Place('p2', 'L\'Amour Toujours', 'A tourist place in paris', 'https://www.discoverwalks.com/blog/wp-content/uploads/2015/07/paris-at-night-big.jpg', 189.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
    // tslint:disable-next-line: max-line-length
    new Place('p3', 'The Foggy Palace', 'Not your average city trip!',
              // tslint:disable-next-line: max-line-length
              'https://images.squarespace-cdn.com/content/v1/5a2537ab1f318dcca23b2a9a/1553072598968-EMRLUY4UVJJXSYH1HVTY/ke17ZwdGBToddI8pDm48kLS5BcfP_ie9JnHe-YTegBMUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dpfpxA3nkZv9VcDdtvE3KElcvuVhHM0TaJxLlL997ZSUm7cT0R_dexc_UL_zbpz6JQ/Bourscheid+Castle+in+the+fog+-+Chateau+de+Bourscheid+-+Luxembourg+-+Bourscheid+castle+in+the+fog+during+an+autumn+sunrise+-+Castle+Adrift+in+the+Valley+of+Fog+-+Photography+by+Christophe+Van+Biesen+-+Landscape+and+Travel+Photographer.jpg?format=1500w',
               120.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc')
  ]);

  constructor(private authService: AuthService) { }

  get places() {
    return this._places.asObservable();
  }

  getPlace(id: string) {
    return this.places.pipe(take(1), map(places => {
      return {...places.find(p => p.id === id)};
    }));
  }

  addPlace(title: string , discription: string, price: number, dateFrom: Date, dateTo: Date ) {
    // tslint:disable-next-line: max-line-length
    const newPlace = new Place(Math.random().toString(),
                     title, discription,
                     'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg' ,
                     price, dateFrom, dateTo, this.authService.userId );
    return this.places.pipe(take(1), delay(1000) , tap(places => {
        this._places.next(places.concat(newPlace));
    }));
  }

  updatePlace(placeId: string, title: string, discription: string) {
    return this.places.pipe(take(1), delay(1000) , tap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId );
      const updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      // tslint:disable-next-line: max-line-length
      updatedPlaces[updatedPlaceIndex] = new Place(oldPlace.id, title, discription, oldPlace.ImageUrl, oldPlace.price, oldPlace.availableFrom, oldPlace.availableTo, oldPlace.userId);
      this._places.next(updatedPlaces);
    }));
  }

}

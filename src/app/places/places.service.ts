import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PlaceLocation } from './location.model';

interface placeData {
  ImageUrl: string;
  availableFrom: string;
  availableTo: string;
  description: string;
  price: number;
  title: string;
  userId: string;
  location: PlaceLocation;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  // tslint:disable-next-line: variable-name
  private _places = new BehaviorSubject<Place[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) { }

  get places() {
    return this._places.asObservable();
  }

  fetchPlaces() {
    return this.http.get<{[key: string]: placeData}>('https://ionic-project-5109e.firebaseio.com/offered-places.json').pipe(map(resData => {
    const places = [];
    for (const key in resData) {
      if (resData.hasOwnProperty(key)) {
        places.push(new Place(key, resData[key].title,
                    resData[key].description, resData[key].ImageUrl, resData[key].price,
                    new Date(resData[key].availableFrom), new Date(resData[key].availableTo), resData[key].userId, resData[key].location));
      }
    }
    return places;
    }), tap(places => {
      this._places.next(places);
    }));
  }

  getPlace(id: string) {
    return this.http.get<placeData>(`https://ionic-project-5109e.firebaseio.com/offered-places/${id}.json`).pipe(
      map(placeData => {
        // tslint:disable-next-line: max-line-length
        return new  Place(id, placeData.title, placeData.description, placeData.ImageUrl, 
          placeData.price, new Date(placeData.availableFrom), new Date(placeData.availableTo), placeData.userId, placeData.location);
      })
    );
  }

  addPlace(title: string , discription: string, price: number, dateFrom: Date, dateTo: Date,
           location: PlaceLocation) {
    let generatedId: string;
    // tslint:disable-next-line: max-line-length
    const newPlace = new Place(Math.random().toString(),
                     title, discription,
                     'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg' ,
                     price, dateFrom, dateTo, this.authService.userId, location );
    return this.http.post<{name: string}>('https://ionic-project-5109e.firebaseio.com/offered-places.json', {...newPlace, id: null}).pipe(
      switchMap(resData => {
        generatedId = resData.name;
        return this.places;
      }),
      take(1),
      tap(places => {
        newPlace.id = generatedId;
        this._places.next(places.concat(newPlace));
        })
    );
    // return this.places.pipe(take(1), delay(1000) , tap(places => {
    //     this._places.next(places.concat(newPlace));
    // }));
  }

  updatePlace(placeId: string, title: string, discription: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(take(1), switchMap(places => {
      if (!places || places.length <= 0) {
        return this.fetchPlaces();
      } else {
        return of(places);
      }
    }),
    switchMap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId );
      updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      // tslint:disable-next-line: max-line-length
      updatedPlaces[updatedPlaceIndex] = new Place(oldPlace.id, title, discription, oldPlace.ImageUrl, oldPlace.price, oldPlace.availableFrom, oldPlace.availableTo, oldPlace.userId, oldPlace.location);
      return this.http.put(`https://ionic-project-5109e.firebaseio.com/offered-places/${placeId}.json`,
      { ...updatedPlaces[updatedPlaceIndex], id: null}
      );
    }),
    tap(() => {
      this._places.next(updatedPlaces);
    })
    );
  }

}

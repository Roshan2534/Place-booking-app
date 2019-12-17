import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // tslint:disable-next-line: variable-name
  private _bookings = new BehaviorSubject<Booking[]>( [] );

  constructor(private authService: AuthService) { }

  get Bookings() {
    return this._bookings.asObservable();
  }

  addBooking(placeId: string,
             placeTitle: string,
             placeImg: string,
             firstName: string,
             lastName: string,
             guestNumber: number,
             dateFrom: Date,
             dateTo: Date) {
              // tslint:disable-next-line: max-line-length
              const newBooking = new Booking(Math.random().toString(), placeId, this.authService.userId, placeTitle, placeImg, firstName, lastName, guestNumber, dateFrom, dateTo);
              return this.Bookings.pipe(take(1), delay(1000) , tap(bookings => {
                this._bookings.next(bookings.concat(newBooking));
              } ));
            }

  cancelBooking(bookingId: string) {
    return this.Bookings.pipe(take(1), delay(1000) , tap(bookings => {
      this._bookings.next(bookings.filter(b => b.id !== bookingId));
    } ));
  }
}

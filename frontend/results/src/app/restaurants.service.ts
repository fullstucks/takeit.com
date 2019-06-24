import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Restaurant } from './results/restaurant';
import { RESTAURANTS } from './mocks/mocks.results';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor() { }

  getRestaurants():Observable<Restaurant[]>{
    return of(RESTAURANTS)
  }

}

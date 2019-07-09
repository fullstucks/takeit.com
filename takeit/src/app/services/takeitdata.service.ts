import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { TopGye } from '../models/topgye';
import { TopZones } from '../models/topzones';
import { TOPGYE, TOPZONES } from '../mocks/mock-takeit-home';
import { Restaurant } from '../models/restaurant';
import { RESTAURANTS } from '../mocks/mocks.results';
import { Noticias } from '../models/noticias';
import { NOTICIAS } from '../mocks/mock-noticias';




@Injectable({
  providedIn: 'root'
})
export class TakeitdataService {

  constructor() { }

  getTopGye():Observable<TopGye[]>{
    return of(TOPGYE)
  }

  getTopZones():Observable<TopZones[]>{
    return of(TOPZONES)
  }

  getRestaurants():Observable<Restaurant[]>{
    return of(RESTAURANTS)
  }

  getRestaurant(id:number):Observable<Restaurant>{
    return of(RESTAURANTS.find(restaurant => restaurant.id == id ));
  }

  getNews():Observable<Noticias[]>{
    return of(NOTICIAS)
  }
}

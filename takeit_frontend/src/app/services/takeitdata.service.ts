import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { TopZones, TopGye } from '../models/tops';
import { TOPGYE, TOPZONES } from '../mocks/mock-takeit-home';
import { Restaurant } from '../models/restaurant';
import { RESTAURANTS } from '../mocks/mocks.results';
import { Noticias } from '../models/noticias';
import { NOTICIAS } from '../mocks/mock-noticias';
import { Reservas } from '../models/reservas';
import { RESERVAS } from '../mocks/mock-reservas';



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

  getReservas():Observable<Reservas[]>{
    return of(RESERVAS)
  }

}

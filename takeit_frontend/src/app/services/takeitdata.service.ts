import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Zones} from '../models/tops';
import { Restaurant } from '../models/restaurant';
import { Noticias } from '../models/noticias';
import { NOTICIAS } from '../mocks/mock-noticias';
import { Reservas } from '../models/reservas';
import { RESERVAS } from '../mocks/mock-reservas';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Cookie} from 'ng2-cookies';
import api from './api';
import { LoginService } from './login.service';



@Injectable({
  providedIn: 'root'
})
export class TakeitdataService {


  constructor(private http: HttpClient, private loginService: LoginService) {
   }

  getRestaurant(id:number):Observable<Restaurant>{

    let params:any = {id_restaurante: id}

    return this.http.get<Restaurant>(api.restaurante, {
      params: params
    })
  }


  getRestaurants(params:any):Observable<Restaurant[]>{

    return this.http.get<Restaurant[]>(api.restaurantes, {
      params:params,
      
    })
  }

  getRestaurantesFavOrOwned():Observable<Restaurant[]>{

    //let hd = new HttpHeaders()
    //hd.append('X-CSRF-Token', Cookie.get('csrftoken'))

    console.log(Cookie.get('csrftoken'))
    return this.http.get<Restaurant[]>(api.restaurantes_fav_or_owned,{
      withCredentials: true
    })
  }



  getTopZones(params:any):Observable<Zones[]>{
    return this.http.get<Zones[]>(api.zonas, {params})
  }


  getNews():Observable<Noticias[]>{
    return of(NOTICIAS)
  }


  getReservas():Observable<Reservas[]>{
    return of(RESERVAS)
  }

}

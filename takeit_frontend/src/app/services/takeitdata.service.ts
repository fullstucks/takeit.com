import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Zones} from '../models/tops';
import { Restaurant } from '../models/restaurant';
import { Planificados } from '../models/planificaciones';
import { Noticias } from '../models/noticias';
import { NOTICIAS } from '../mocks/mock-noticias';
import { Reservas } from '../models/reservas';
import { RESERVAS } from '../mocks/mock-reservas';
import { HttpClient, HttpParams } from '@angular/common/http';
import api from './api';



@Injectable({
  providedIn: 'root'
})
export class TakeitdataService {

  constructor(private http: HttpClient) { }

  getRestaurant(id:number):Observable<any>{
    let params:any = {restaurante_id: id}
    return this.http.get<Restaurant>(api.restaurante,{params})
  }

  getRestaurants(params:any):Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>(api.restaurantes, {params})
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
  
  getReservasPlanificadas(id:number):Observable<any>{
    let params:any = {id_restaurante: id}
    return this.http.get<Planificados[]>(api.horariosPlanificados,{params})
  }
}

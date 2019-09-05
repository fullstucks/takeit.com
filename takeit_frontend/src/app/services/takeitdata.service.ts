import { Planificados } from './../models/planificaciones';
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

    let params:any = {restaurante_id: id}

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

    return this.http.get<Restaurant[]>(api.restaurantes_fav_or_owned,{
      withCredentials: true
    })
  }

  getReservasList():Observable<any[]>{
    return this.http.get<any[]>(api.reserva_list, {
      withCredentials: true
    })
  }

  getPlanificaciones():Observable<any[]>{
    return this.http.get<any[]>(api.planificacion, {
      withCredentials: true
    })
  }
  getReservasPlanificadas(id:number):Observable<any>{
    let params:any = {id_restaurante: id}
    return this.http.get<Planificados[]>(api.horariosPlanificados,{params})
  }
  createReserva(reserva): Observable<any>{
    const body = {reserva_planificacion:reserva.id_reserva_planificacion, asistio:reserva.asistion,detalles:reserva.detalles,usuario:reserva.usuario}
    console.log(body);
    return this.http.post(api.reservar,body);
  }

  getTagsList():Observable<any[]>{
    return this.http.get<any[]>(api.tag_list,{
      withCredentials: true
    })
  }


  getZonasList():Observable<any[]>{
    return this.http.get<any[]>(api.zona_list, {
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

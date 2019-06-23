import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

import {TOPZONES, TOPGYE} from './mocks/mock-takeit-home';
import { TopZones } from './topzones/topzones';
import { TopGye } from './topgye/topgye';

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
}

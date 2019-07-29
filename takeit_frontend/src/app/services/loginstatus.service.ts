import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginstatusService {

  loggedin:boolean

  constructor() {}

  setSessionStatus(status: boolean):void {
    this.loggedin = status;
  }

}


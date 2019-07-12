import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginstatusService {

  private loggedin:Subject<boolean> = new Subject<boolean>();
  loggedin$ = this.loggedin.asObservable();

  constructor() { }


  setSessionStatus(status: boolean):void {
    this.loggedin.next(status);
  }
}

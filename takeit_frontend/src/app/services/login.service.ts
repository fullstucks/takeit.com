import { Injectable } from '@angular/core';
import {Cookie} from 'ng2-cookies';
import api from './api'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedin:boolean
  public loading:boolean = false

  constructor() {
    let hasLog = Cookie.check('logged')
    this.loggedin = hasLog;
  }

  login(user:any):void{
    this.loading = true
    fetch(api.login ,{
      method:'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => {
      if(res.ok){
        Cookie.set('logged', '1')
        this.loggedin = true
      }
      this.loading = false
    })
    .catch(err => console.log(err))

  }

  logout():void{
    Cookie.delete('logged')
    this.loggedin = false
  }

  getSessionStatus():boolean{
    return this.loggedin
  }

}


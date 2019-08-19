import { Injectable } from '@angular/core';
import {Cookie} from 'ng2-cookies';
import api from './api'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loggedin:boolean
  public loading:boolean = false

  private user_info:any = {
    es_admin_restaurante: false
  };

  constructor(private http: HttpClient) {
    this.loggedin = Cookie.check('logged');
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
        this.load_user_info()
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

  load_user_info(){
    fetch(api.user_info, {
      method: 'get'
    })
      .then(
        response => response.json()
      )
      .then(
        data =>{
          console.log(data)
          console.log(this.user_info)
        }
        
      )
  }

  get_user_info():any{
    return this.user_info;
  }

}


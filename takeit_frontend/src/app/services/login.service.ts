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
    username: Cookie.get('username'),
    es_admin_restaurante: Cookie.check('es_admin_restaurante')
  }

  constructor(private http: HttpClient) {
    this.loggedin = Cookie.check('logged');
  }


  login(user:any):void{

    this.loading = true

    fetch(api.login ,{
      credentials: 'include',
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
      return res.json()
    })
    .then(data => {
      console.log(data)
      if (data.es_admin_restaurante){
        Cookie.set('es_admin_restaurante', '1')
        this.user_info.es_admin_restaurante = data.es_admin_restaurante
      }
      Cookie.set('username', data.username)
      this.user_info.username = data.username
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


import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedin:boolean;
  public user: any = {
    username: "",
    password: ""
  }

  constructor(private router: Router,
              private loginService: LoginService) {}

  ngOnInit() {
  }


  login(user:any):void{
    this.loginService.login(user);
  }

  logout():void{
    this.loginService
        .logout()
  }


  updateToken(token):void{
    console.log(token)
  }

  goMisReservas(){
    this.router.navigateByUrl('/misReservas')
  }

  goAdministrarRestaurantes(){
    this.router.navigateByUrl('/administrarRestaurantes')
  }

}

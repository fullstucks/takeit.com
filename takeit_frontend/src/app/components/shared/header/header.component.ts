import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginstatusService } from 'src/app/services/loginstatus.service';


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
              private loginStatusService: LoginstatusService) {}

  ngOnInit() {
  }


  login(user:any):void{
    console.log(this.user)

    fetch('http://localhost:8000/api/auth/',{
      method:'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.user)
    })
    .then(res => {
      this.loginStatusService
          .setSessionStatus(true)
    })
    .catch(err => console.log(err))
  }

  logout():void{
    this.loginStatusService
        .setSessionStatus(false)
  }


  updateToken(token):void{
    console.log(token)
  }

  goMisReservas(){
    this.router.navigateByUrl('/misReservas')
  }

}

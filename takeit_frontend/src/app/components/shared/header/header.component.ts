import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginstatusService } from 'src/app/services/loginstatus.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedin:boolean;

  constructor(private router: Router,
              private loginstatusService: LoginstatusService) { 
                loginstatusService
                    .loggedin$.subscribe(
                      status => this.loggedin = status
                      )
              }

  ngOnInit() {
    
  }


  login():void{
    //this.loginstatusService
     //   .setSessionStatus(true)
  }

  logout():void{
    this.loginstatusService
        .setSessionStatus(false)
  }

  goMisReservas(){
    this.router.navigateByUrl('/misReservas')
  }

}

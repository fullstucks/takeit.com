import { Component, OnInit } from '@angular/core';
import { LoginstatusService } from './services/loginstatus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'takeit';

  constructor(private loginStatusService: LoginstatusService){

  }

  ngOnInit(): void {
    this.loginStatusService
        .setSessionStatus(false)
  }

}

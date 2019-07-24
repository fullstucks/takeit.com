import { Component, OnInit } from '@angular/core';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { Reservas } from '../../models/reservas';
import { LoginstatusService } from 'src/app/services/loginstatus.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {

  reservas:Reservas[]
  loggedin:boolean;

  constructor(private takeitDataService:TakeitdataService,
              private loginStatusService: LoginstatusService) {
               }


  ngOnInit() {
    
    this.loginStatusService
                  .loggedin$
                  .subscribe(status => this.loggedin = status);
    this.loginStatusService.setSessionStatus(true)
    this.getRest()
  }
  

  getRest():void{
    this.takeitDataService.getReservas()
    .subscribe(reservas => this.reservas = reservas)
  }

  eliminar(id:number):void{
      this.reservas.splice(id-1, 1);    
  }

}

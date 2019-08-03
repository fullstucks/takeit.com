import { Component, OnInit } from '@angular/core';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { Reservas } from '../../models/reservas';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {

  reservas:Reservas[]
  loggedin:boolean;

  constructor(private takeitDataService:TakeitdataService,
              private loginService: LoginService) {}


  ngOnInit() {
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

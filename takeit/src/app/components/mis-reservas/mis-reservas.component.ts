import { Component, OnInit } from '@angular/core';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { Reservas } from '../../models/reservas';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {

  reservas:Reservas[]

  constructor(private takeitDataService:TakeitdataService) { }


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

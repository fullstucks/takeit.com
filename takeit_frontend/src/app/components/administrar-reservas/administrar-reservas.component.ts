import { Component, OnInit } from '@angular/core';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import api from 'src/app/services/api'

@Component({
  selector: 'app-administrar-reservas',
  templateUrl: './administrar-reservas.component.html',
  styleUrls: ['./administrar-reservas.component.css']
})
export class AdministrarReservasComponent implements OnInit {


  reservas:any[] = []

  constructor(private takeitDataService: TakeitdataService) { }

  ngOnInit() {
    this.load_reservas()
  }


  load_reservas(){
    this.takeitDataService.getReservasList()
      .subscribe(
        data => {
          this.reservas = data
          console.log(data)
        }
      )
  }


  confirmar(reserva:any):void{
    let data = {
      id:reserva.id,
      asistio: true,
      detalles: reserva.detalles,
      reserva_planificacion: reserva.reserva_planificacion.id,
      usuario: reserva.usuario.id
    }

    fetch(api.reservas + reserva.id + '/',{
      method: 'put',
      credentials: 'include',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log(response.json())
      if(response.ok){
        this.load_reservas()
      }
    })
  }

}

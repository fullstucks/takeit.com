import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { LoginService } from 'src/app/services/login.service';
import api from 'src/app/services/api'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-administrar-restaurantes-planificar',
  templateUrl: './administrar-restaurantes-planificar.component.html',
  styleUrls: ['./administrar-restaurantes-planificar.component.css']
})
export class AdministrarRestaurantesPlanificarComponent implements OnInit {


  restaurantes: Restaurant[] = []
  planificaciones:any[] = []


  post_planificacion:any = {};


  constructor(private loginService : LoginService,
              private takeitDataService: TakeitdataService) {}

  ngOnInit() {
    this.load_restaurantes()
    this.load_planification()
  }

  load_restaurantes(){
    this.takeitDataService.getRestaurantesFavOrOwned()
      .subscribe(
        data => {
          this.restaurantes = data
          console.log(data)
        }
      )
  }
  load_planification(){
    this.takeitDataService.getPlanificaciones()
      .subscribe(
        data => {
          this.planificaciones = data
          console.log(data)
        }
      )
  }



  add(form_data:NgForm):void{
    
    let values = form_data.value

    let data = {
      fecha: this.post_planificacion.new_date +' '+ this.post_planificacion.new_time,
      restaurante: values.restaurante,
      mesas_disponibles: values.mesas_disponibles,
      mesas_totales: values.mesas_totales
    }


    fetch(api.planificacion,{
      method: 'post',
      credentials: 'include',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response =>{
      console.log(response)
      if(response.ok){
        this.load_planification()
      }
    })
  }


  edit(planificacion:any):void{
    
    let new_fecha = ''

    if (!planificacion.new_date || !planificacion.new_time){
      new_fecha = planificacion.fecha
    }
    else{
      new_fecha = planificacion.new_date +' '+ planificacion.new_time
    }
  
    let data = {
      fecha: new_fecha,
      restaurante: planificacion.restaurante.id,
      mesas_disponibles: planificacion.new_mesas_disponibles || planificacion.mesas_disponibles,
      mesas_totales: planificacion.new_mesas_totales || planificacion.mesas_totales
    }

    console.log(data)


    fetch(api.planificacion + planificacion.id + '/', {
      method:'put',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response =>{
      if(response.ok){
        console.log(response.json())
        this.load_planification()
      }
    })
    .catch(e => {
     console.log(e) 
    })
  }


  remove(planificacion):void{
    console.log(planificacion)
    fetch(api.planificacion + planificacion.id + '/', {
      method:'delete',
      credentials: 'include'
    })
    .then(response =>{
      if(response.ok){
        this.load_planification()
      }
    })
  }


}

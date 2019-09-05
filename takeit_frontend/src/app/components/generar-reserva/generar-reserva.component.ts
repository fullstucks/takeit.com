import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { Location } from '@angular/common';
import { Restaurant } from 'src/app/models/restaurant';
import { Planificados } from 'src/app/models/planificaciones';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Reserva } from 'src/app/models/reserva';

@Component({
  selector: 'app-generar-reserva',
  templateUrl: './generar-reserva.component.html',
  styleUrls: ['./generar-reserva.component.css']
})
export class GenerarReservaComponent implements OnInit {
  reserva:Reserva;


  stepperForm: FormGroup;
  actualFieldForm;
  nextFieldForm;
  previousFieldForm;
 
  isEditable = false;
  isCollapsedEntradas:boolean=false;
  isCollapsedConfirmacion: boolean=true;
  isCollapsedPago: boolean= true;

  restaurant: Restaurant;
  nameRestaurant:any;
  descriptionRestaurant:any;
  planificados:Planificados[];
  fechasHoraPlanificadas=[];

  planSelecionado:Planificados;
  
  idPlanSelected:any;
  mesasDisponibles:any;
  horaSeleccionada:any;
  verSeleccion:any="";
  objetoSeleccionado:any="0";

  step1:String = "active"; step2: String; step3: String;

  elegido:string="";
  formVisibility:boolean;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private takeitDataService: TakeitdataService, 
             ) { }

  ngOnInit() {

    this.getRestaurant()
    this.getPlanificados()
    
  }


  createReserva(){
    this.takeitDataService.createReserva(this.reserva)
    console.log("reservada con exito")
  }
  /**
   * obtains the restaurant's id through the url
   */
  getRestaurant():void{
    const id =+ this.route.snapshot.paramMap.get('id');
    this.takeitDataService.getRestaurant(id)
        .subscribe(datarestaurant => {
          this.restaurant = datarestaurant
          this.nameRestaurant=this.restaurant.nombre
          this.descriptionRestaurant=this.restaurant.descripcion
          console.log(this.restaurant)
          console.log(this.nameRestaurant)
        })
  }

  
  getPlanificados():void{
    const id =+ this.route.snapshot.paramMap.get('id');
    this.takeitDataService.getReservasPlanificadas(id)
       .subscribe(
         plan=>{
           this.planificados= plan;
           console.log(this.planificados)
           var line = [];
           for (var i = 0; i < plan.length; i++) {
            var datafecha = plan[i].fecha.split(' ');
            var linefecha=[];
            linefecha[0] = datafecha[0];
            linefecha[1] = datafecha[1];
            linefecha[2] = plan[i].mesas_disponibles;
            linefecha[3] = parseInt(plan[i].id);
            line.push(linefecha)  
          } 
          console.log("fechas")
          this.fechasHoraPlanificadas=line;  
          console.log(this.fechasHoraPlanificadas)
         }
       )
  }
  onChange(plan){
    this.verSeleccion=plan.split(",")
    this.mesasDisponibles=this.verSeleccion[2]
    this.horaSeleccionada=this.verSeleccion[1]
    this.idPlanSelected=parseInt(this.verSeleccion[3])
    console.log(this.verSeleccion)
    console.log(this.horaSeleccionada)
    
    console.log('reserva')
  }
  
  goBack(): void {
    this.location.back();
  }

  goStep1(): void{
    this.isCollapsedEntradas =false;
    this.isCollapsedConfirmacion=true;
    this.isCollapsedPago=true;
    this.step1="active";
    this.step2="0";
    this.step3="0";
  }
  goStep2(): void {
    console.log(this.reserva)

    this.isCollapsedEntradas =true;
    this.isCollapsedConfirmacion=false;
    this.isCollapsedPago=true;
    this.step1="active";
    this.step2="active";
    this.step3="0";

    this.reserva={
      id_reserva_planificacion: this.idPlanSelected,
      asistion: false,
      detalles: "",
      usuario: 1,
      n_mesas: parseInt((document.getElementById("num-entradas") as HTMLInputElement).value)
    }
  console.log(this.reserva)
  }
  goStep3(): void {
    this.isCollapsedEntradas =true;
    this.isCollapsedConfirmacion=true;
    this.isCollapsedPago=false;
    this.step1="active";
    this.step2="active";
    this.step3="active";
  }
 
}

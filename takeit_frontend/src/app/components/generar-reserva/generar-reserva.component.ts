import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { Location } from '@angular/common';
import { Restaurant } from 'src/app/models/restaurant';
import { Planificados } from 'src/app/models/planificaciones';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-generar-reserva',
  templateUrl: './generar-reserva.component.html',
  styleUrls: ['./generar-reserva.component.css']
})
export class GenerarReservaComponent implements OnInit {
  
  stepperForm: FormGroup;
  actualFieldForm;
  nextFieldForm;
  previousFieldForm;
 
  isEditable = false;
  isCollapsedEntradas:boolean=false;
  isCollapsedConfirmacion: boolean=true;
  isCollapsedPago: boolean= true;

  restaurant: any;
  planificados:Planificados[];
  fechasPlanificadas:[];

  planSelecionado:Planificados;
  
  mesasDisponibles:any;
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


  /**
   * obtains the restaurant's id through the url
   */
  getRestaurant():void{
    const id =+ this.route.snapshot.paramMap.get('id');
    this.takeitDataService.getRestaurant(id)
        .subscribe(restaurant => {
          this.restaurant = restaurant
          console.log(this.restaurant)
        })
  }

  
  getPlanificados():void{
    const id =+ this.route.snapshot.paramMap.get('id');
    this.takeitDataService.getReservasPlanificadas(id)
       .subscribe(
         data=>{
           this.planificados= data;
           var line = [];
           for (var i = 0; i < data.length; i++) {
            var datafecha = data[i].fecha.split(' ');
            var linefecha;
            linefecha[0] = datafecha[0];
            linefecha[1] = datafecha[1];
            line.push(linefecha)  
          } 
          console.log(line)      
          console.log(this.planificados)
         }
       )
  }
  onChange(plan){
    this.verSeleccion=plan;
    console.log(this.verSeleccion)
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
    this.isCollapsedEntradas =true;
    this.isCollapsedConfirmacion=false;
    this.isCollapsedPago=true;
    this.step1="active";
    this.step2="active";
    this.step3="0";
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { Location } from '@angular/common';
import { Restaurant } from 'src/app/models/restaurant';
import { Planificados } from 'src/app/models/planificaciones.model';
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
 
  step1:String = "active"; step2: String; step3: String;

  
  
  constructor(private route: ActivatedRoute,
              private location: Location,
              private takeitDataService: TakeitdataService, 
              private fb:FormBuilder,
             ) { }

  ngOnInit() {

    this.getRestaurant()
    this.getPlanificados()
    
  }


  /**
   * obtains the restaurant's id through the url
   */
  initStepperForm(){
    this.stepperForm =this.fb.group({
      
    });
  }
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
           this.planificados = data;
           console.log(this.planificados)
         }
       )
  }
  
  goBack(): void {
    this.location.back();
  }

  goStep1(): void{
    this.isCollapsedEntradas =false;
    this.isCollapsedConfirmacion=true;
    this.isCollapsedPago=true;
    this.step1="active";
    this.step2="";
    this.step3="";
  }
  goStep2(): void {
    this.isCollapsedEntradas =true;
    this.isCollapsedConfirmacion=false;
    this.isCollapsedPago=true;
    this.step1="active";
    this.step2="active";
    this.step3="";
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

import { Component, OnInit } from '@angular/core';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { NgForm } from '@angular/forms';
import api from 'src/app/services/api'

@Component({
  selector: 'app-administrar-restaurantes-agregar',
  templateUrl: './administrar-restaurantes-agregar.component.html',
  styleUrls: ['./administrar-restaurantes-agregar.component.css']
})
export class AdministrarRestaurantesAgregarComponent implements OnInit {


  tags:any[]
  zonas:any[]

  selectedTags: any[] = []
  selected_zona:any

  success:boolean = false

  constructor(private takeitDataService: TakeitdataService) { }

  
  ngOnInit() {
    this.takeitDataService.getTagsList()
      .subscribe(
        data => this.tags = data
      )
    
    this.takeitDataService.getZonasList()
      .subscribe(
        data => this.zonas = data
      )
  }


  post_restaurant(form_data:NgForm):void{
    let values = form_data.value

    values.tags = JSON.stringify(this.selectedTags.map((t) => t.id))
    values.zona = parseInt(values.zona)
    console.log(values)

    fetch(api.restaurante,{
      method:'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then((response)=>{
      console.log(response.json())
      if(response.ok)
        this.success = true
    }).catch((e)=> console.log(e))
  }


  addTag(tag:any):void{
    if(!this.selectedTags.includes(tag))
        this.selectedTags.push(tag)
  }

}

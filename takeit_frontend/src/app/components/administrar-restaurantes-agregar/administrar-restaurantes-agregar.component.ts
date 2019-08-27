import { Component, OnInit } from '@angular/core';
import { TakeitdataService } from 'src/app/services/takeitdata.service';

@Component({
  selector: 'app-administrar-restaurantes-agregar',
  templateUrl: './administrar-restaurantes-agregar.component.html',
  styleUrls: ['./administrar-restaurantes-agregar.component.css']
})
export class AdministrarRestaurantesAgregarComponent implements OnInit {


  input_data:any = {
    nombre: '',
    ubicacion: '',
    zona: '',
    lat: '',
    lng: '',
    descripcion:'',
    tags:'' 
  }

  tags:any[]
  zonas:any[]

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

  post_restaurant():void{

  }

}

import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Restaurant } from 'src/app/models/restaurant';
import api from 'src/app/services/api'
import { TakeitdataService } from 'src/app/services/takeitdata.service';

@Component({
  selector: 'app-administrar-restaurantes',
  templateUrl: './administrar-restaurantes.component.html',
  styleUrls: ['./administrar-restaurantes.component.css']
})
export class AdministrarRestaurantesComponent implements OnInit {

  restaurantes: Restaurant[] = []
  selected_restaurant:Restaurant

  
  constructor(private loginService : LoginService,
              private takeitDataService: TakeitdataService
  ) { }

  ngOnInit() {
    this.takeitDataService.getRestaurantesFavOrOwned()
      .subscribe(
        data => {
          this.restaurantes = data
          console.log(data)
        }
      )
  }

  eliminar(restaurant:Restaurant):void{
    this.selected_restaurant = restaurant
  }

  editar(restaurant:Restaurant):void{
    this.selected_restaurant = restaurant
  }

}

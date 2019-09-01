import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Restaurant } from 'src/app/models/restaurant';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { Router } from '@angular/router';
import api from 'src/app/services/api';

@Component({
  selector: 'app-administrar-restaurantes',
  templateUrl: './administrar-restaurantes.component.html',
  styleUrls: ['./administrar-restaurantes.component.css']
})
export class AdministrarRestaurantesComponent implements OnInit {

  restaurantes: Restaurant[] = []
  selected_restaurant:Restaurant

  
  constructor(private loginService : LoginService,
              private takeitDataService: TakeitdataService,
              private router: Router) {}

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

    fetch(api.restaurante + restaurant.id + '/',{
      method:'delete',
      credentials: 'include'
    })
    .then(response => console.log(response.json()))
    .catch(e => console.log(e))
  }

  editar(restaurant:Restaurant):void{
    this.selected_restaurant = restaurant
    this.router.navigate(['administrarRestaurantes/editar/' + restaurant.id])
  }

  onAdd():void{
    this.router.navigate(['/administrarRestaurantes/agregar'])
  }

}

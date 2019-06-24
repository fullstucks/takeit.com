import { Component } from '@angular/core';
import { Restaurant } from './results/restaurant';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})


export class AppComponent {

  search_input: string;

  results: Restaurant[] = []

  suggestions:Restaurant[] = []

  max:number = 5

  constructor(private restaurantsService: RestaurantsService){}


  onEdit(news:string):void{

    console.log(news)
      this.restaurantsService.getRestaurants()
      .subscribe(restaurants =>{
        this.results = []

        for (let i = 0; i< this.max; i++){
          if(restaurants[i].nombre.toLowerCase().startsWith(this.search_input.toLowerCase()))
            this.suggestions.push(restaurants[i])
          }
        })
    
    }
  

  onSearch():void{

    
      this.restaurantsService.getRestaurants()
        .subscribe(restaurants =>{
          this.results = []
    
          for (let restaurant of restaurants){
            let r = restaurant.nombre.toLowerCase().includes(this.search_input.toLowerCase())
            let u = restaurant.ubicacion.toLowerCase().includes(this.search_input.toLowerCase())
            if(r || u)
              this.results.push(restaurant)
          }
        })
    
  }

}

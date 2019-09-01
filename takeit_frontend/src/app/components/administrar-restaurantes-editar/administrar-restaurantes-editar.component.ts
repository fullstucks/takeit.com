import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { Restaurant } from 'src/app/models/restaurant';
import { NgForm } from '@angular/forms';
import api from 'src/app/services/api'

@Component({
  selector: 'app-administrar-restaurantes-editar',
  templateUrl: './administrar-restaurantes-editar.component.html',
  styleUrls: ['./administrar-restaurantes-editar.component.css']
})
export class AdministrarRestaurantesEditarComponent implements OnInit {

  restaurant:Restaurant = new Restaurant()

  available_tags:any
  selected_tags:any

  zonas:any

  success:boolean = false


  constructor(private route: ActivatedRoute,
              private takeitDataService: TakeitdataService) { }

  ngOnInit() {
    this.getRestaurant()
    this.getAvailableTags()
    this.getAvailableZonas()
  }


  put_restaurant(form_data:NgForm):void{
    let values = form_data.value

    values.tags = JSON.stringify(this.selected_tags.map((t) => t.id))
    values.zona = parseInt(values.zona)
    console.log(values)

    fetch(api.restaurante + this.restaurant.id + '/',{
      method:'put',
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



  getRestaurant():void{
    const id =+ this.route.snapshot.paramMap.get('restaurante_id');
    this.takeitDataService.getRestaurant(id)
        .subscribe(
          restaurant => {
            this.restaurant = restaurant
            this.selected_tags = restaurant.tags
            console.log(restaurant)
          }
        )
  }

  getAvailableTags():void{
    this.takeitDataService.getTagsList()
        .subscribe(tags =>{
          this.available_tags = tags
        })
  }

  getAvailableZonas():void{
    this.takeitDataService.getZonasList()
    .subscribe(
      data => {
        this.zonas = data
        console.log(data)
      }
    )
  }
  


  addTag(tag):void{
    if(!this.selected_tags.includes(tag))
    this.selected_tags.push(tag)
  }

  removeTag(tag):void{
    for(var i = this.selected_tags.length - 1; i >= 0; i--) {
      if(this.selected_tags[i].id === tag.id) {
         this.selected_tags.splice(i, 1);
      }
    }
  }

}

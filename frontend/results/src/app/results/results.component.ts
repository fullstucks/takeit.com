import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from './restaurant';
import { RestaurantsService } from '../restaurants.service';
import {latLng, marker, tileLayer, Marker, map} from 'leaflet';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})


export class ResultsComponent implements OnInit {

  
/*
  layersControl = {
    baseLayers: {
      'Open Street Map': this.streetmap
    }
  };
*/

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        detectRetina: true
      })
    ],
    zoom: 13,
    center: latLng([ -2.18157, -79.87551]),
  };

  //showLayer:boolean = true;
  marker:Marker = marker([ -2.18157, -79.87551])

  @Input() restaurants: Restaurant[];
  selectedRestaurant:Restaurant;


  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit() {
    this.getRestaurants()

  }

  getRestaurants():void{
    this.restaurantsService.getRestaurants()
    .subscribe(restaurants => this.restaurants = restaurants)
  }

  onSelect(selected: Restaurant): void {
    this.selectedRestaurant = selected;
    //this.options.center = latLng([selected.lat, selected.lng])
    //this.options.layers[0].setView([selected.lat, selected.lng])
    this.marker = marker([selected.lat, selected.lng])
  }

  takeit():void{
    console.log("takeit")
    window.open("/seleccionarMesa","_self")
  }

  list_n(n:number):Array<number>{
    return Array(n)
  }


}

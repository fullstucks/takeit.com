import { Component, OnInit, Input } from '@angular/core';
import {latLng, marker, tileLayer, Marker} from 'leaflet';
import { Restaurant } from 'src/app/models/restaurant';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})


export class ResultsComponent implements OnInit {


  restaurants: Restaurant[];
  selectedRestaurant:Restaurant;
  text_input:string;
  given_text_input:string;

  /*
    Open street map option's for leaflet
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



  constructor(private takeitdataService: TakeitdataService,
              private route: ActivatedRoute,
              private router: Router) { }



  ngOnInit() {
    this.given_text_input = this.route.snapshot.queryParamMap.get('search_string');
    this.getRestaurants(this.given_text_input);
  }


  onSearch():void{
    this.getRestaurants(this.text_input)
    this.given_text_input = this.text_input;
  }


  getRestaurants(search_string:string):void{
    this.takeitdataService.getRestaurants()
      .subscribe(restaurants =>{
        this.restaurants = []
  
        for (let restaurant of restaurants){
          let r = restaurant.nombre.toLowerCase().includes(search_string.toLowerCase())
          let u = restaurant.ubicacion.toLowerCase().includes(search_string.toLowerCase())
          if(r || u)
            this.restaurants.push(restaurant)
        }
      })
  }



  onSelect(selected: Restaurant): void {
    this.selectedRestaurant = selected;
    this.marker = marker([selected.lat, selected.lng])
  }



  takeit(id:number):void{
    this.router.navigateByUrl('/generarReserva/'+ id)
  }



  list_n(n:number):Array<number>{
    return Array(n)
  }
}
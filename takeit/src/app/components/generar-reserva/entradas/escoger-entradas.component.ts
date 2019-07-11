import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { Location } from '@angular/common';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-escoger-entradas',
  templateUrl: './escoger-entradas.component.html',
  styleUrls: ['./escoger-entradas.component.css']
})
export class EscogerEntradasComponent implements OnInit {

  restaurant: Restaurant

  constructor(private route: ActivatedRoute,
              private location: Location,
              private takeitDataService: TakeitdataService) { }

  ngOnInit() {
    this.getRestaurant()
  }


  /**
   * obtains the restaurant's id through the url
   */
  getRestaurant():void{
    const id =+ this.route.snapshot.paramMap.get('id');
    this.takeitDataService.getRestaurant(id)
        .subscribe(restaurant => this.restaurant = restaurant)
  }

  goBack(): void {
    this.location.back();
  }

}

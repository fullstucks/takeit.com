import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Restaurant } from 'src/app/models/restaurant';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info-restaurante',
  templateUrl: './info-restaurante.component.html',
  styleUrls: ['./info-restaurante.component.css']
})
export class InfoRestauranteComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private location: Location,
              private takeitDataService: TakeitdataService,
              private router: Router) { }


  restaurant: Restaurant

  ngOnInit() {
    this.getRestaurant()
  }

  getRestaurant():void{
    const id =+ this.route.snapshot.paramMap.get('id');
    this.takeitDataService.getRestaurant(id)
        .subscribe(restaurant => this.restaurant = restaurant)
  }

  goBack(): void {
    this.location.back();
  }

  takeit(id:number):void{
    this.router.navigateByUrl('/generarReserva/'+ id)
  }

  list_n(n:number):Array<number>{
    return Array(n)
  }
}

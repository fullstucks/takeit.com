import { Component, OnInit } from '@angular/core';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';


@Component({
  selector: 'app-topgye',
  templateUrl: './topgye.component.html',
  styleUrls:['./topgye.component.css']
})
export class TopgyeComponent implements OnInit {

  tops:Restaurant[]

  constructor(private takeitDataService:TakeitdataService,
              private router: Router) { }

  ngOnInit() {
    this.getTops();
  }

  getTops():void{
    this.takeitDataService.getRestaurants({ top: 10 })
    .subscribe(tops =>{
      this.tops = tops
      console.log(tops)
    } )
  }

  goInfo(id:number):void{
    this.router.navigate(['/infoRestaurante/' + id])
  }

}

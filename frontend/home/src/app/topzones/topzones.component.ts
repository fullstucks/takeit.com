import { Component, OnInit } from '@angular/core';
import { TopZones } from './topzones';
import { TakeitdataService } from '../takeitdata.service';

@Component({
  selector: 'app-topzones',
  templateUrl: './topzones.component.html'
})
export class TopzonesComponent implements OnInit {

  tops: TopZones[];

  constructor(private takeitDataService: TakeitdataService) { }

  ngOnInit() {
    this.getTops();
  }

  getTops():void{
    this.takeitDataService.getTopZones()
    .subscribe(tops=> {this.tops = tops; console.log(this.tops)})
  }

}

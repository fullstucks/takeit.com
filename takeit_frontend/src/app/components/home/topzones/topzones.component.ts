import { Component, OnInit } from '@angular/core';
import { TopZones } from '../../../models/tops';
import { TakeitdataService } from 'src/app/services/takeitdata.service';


@Component({
  selector: 'app-topzones',
  templateUrl: './topzones.component.html',
  styleUrls: ['./topzones.component.css']
})



export class TopzonesComponent implements OnInit {

  tops: TopZones[];

  constructor(private takeitDataService: TakeitdataService) { }

  ngOnInit() {
    this.getTops();
  }

  getTops():void{
    this.takeitDataService.getTopZones()
    .subscribe(tops=> {this.tops = tops})
  }

}

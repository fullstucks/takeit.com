import { Component, OnInit } from '@angular/core';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { Zones } from 'src/app/models/tops';


@Component({
  selector: 'app-topzones',
  templateUrl: './topzones.component.html',
  styleUrls: ['./topzones.component.css']
})



export class TopzonesComponent implements OnInit {

  tops: Zones[];

  constructor(private takeitDataService: TakeitdataService) { }

  ngOnInit() {
    this.getTops();
  }

  getTops(): void {
    this.takeitDataService.getTopZones({ top: 9 })
      .subscribe(tops => {
        this.tops = tops
      })
  }

}

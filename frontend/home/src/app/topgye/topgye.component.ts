import { Component, OnInit } from '@angular/core';
import { TakeitdataService } from '../takeitdata.service';
import { TopGye } from './topgye';


@Component({
  selector: 'app-topgye',
  templateUrl: './topgye.component.html'
})
export class TopgyeComponent implements OnInit {

  tops:TopGye[]

  constructor(private takeitDataService:TakeitdataService) { }

  ngOnInit() {
    this.getTops()
  }

  getTops():void{
    this.takeitDataService.getTopGye()
    .subscribe(tops => this.tops = tops)
  }

}

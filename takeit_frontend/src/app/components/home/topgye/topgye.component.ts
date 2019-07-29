import { Component, OnInit } from '@angular/core';
import { TopGye } from '../../../models/tops';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topgye',
  templateUrl: './topgye.component.html',
  styleUrls:['./topgye.component.css']
})
export class TopgyeComponent implements OnInit {

  tops:TopGye[]

  constructor(private takeitDataService:TakeitdataService,
              private router: Router) { }

  ngOnInit() {
    this.getTops()
  }

  getTops():void{
    this.takeitDataService.getTopGye()
    .subscribe(tops => this.tops = tops)
  }

  goInfo(id:number):void{
    this.router.navigate(['/infoRestaurante/' + id])
  }

}

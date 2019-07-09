import { Component, OnInit } from '@angular/core';
import { Noticias } from '../../../models/noticias';
import { TakeitdataService } from 'src/app/services/takeitdata.service';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  news:Noticias[]

  constructor(private takeitDataService:TakeitdataService) { }

  ngOnInit() {
    this.getNews()
  }

  getNews():void{
    this.takeitDataService.getNews()
    .subscribe(news => this.news = news)
  }

}


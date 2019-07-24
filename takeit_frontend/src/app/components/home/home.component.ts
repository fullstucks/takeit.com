import { Component, OnInit } from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showIntroModal:boolean = true;

  data_intro:string[] = [
    "UNO",
    "DOS",
    "TRES"
  ]


  constructor() { }

  ngOnInit() {
    let cookie = Cookie.get('showIntro')
    if(!cookie) Cookie.set('showIntro', 'f')
    else this.showIntroModal = false
  }

  close():void{
    this.showIntroModal = !this.showIntroModal
    Cookie.delete('showIntro')
  }

}

import { Component, OnInit } from '@angular/core';
import {Cookie} from 'ng2-cookies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showIntroModal:boolean = true;

  constructor() { }

  ngOnInit() {
    if (!Cookie.check('showIntro')) {
      Cookie.set('showIntro', '1')
    }else{
      this.showIntroModal = Cookie.get('showIntro') === '1'
    }
    
  }

  close():void{
    this.showIntroModal = false
    Cookie.set('showIntro', '0')
  }

}

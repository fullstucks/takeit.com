import { Component, OnInit } from '@angular/core';

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
  }

  close():void{
    this.showIntroModal = !this.showIntroModal
  }

}

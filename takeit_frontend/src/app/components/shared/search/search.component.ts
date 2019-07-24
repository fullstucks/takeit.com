import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  text_input:string = "";


  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSearch():void{
    this.router.navigate(['/results'], {queryParams:{search_string: this.text_input}})
  }

}

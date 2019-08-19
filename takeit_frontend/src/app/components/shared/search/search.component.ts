import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  search_input:string = "";


  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSearch():void{
    this.router.navigate(['/results'], {queryParams:{search_input: this.search_input}})
  }

}

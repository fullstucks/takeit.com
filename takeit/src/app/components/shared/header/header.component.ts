import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() loggedin;

  constructor(private router: Router) { }

  ngOnInit() {
  }


  login():void{
    this.loggedin = true
  }

  logout():void{
    this.loggedin = false
  }

  goMisReservas(){
    this.router.navigateByUrl('/misReservas')
  }

}

import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-administrar-restaurantes',
  templateUrl: './administrar-restaurantes.component.html',
  styleUrls: ['./administrar-restaurantes.component.css']
})
export class AdministrarRestaurantesComponent implements OnInit {

  
  constructor(private loginService : LoginService ) { }

  ngOnInit() {
  }

}

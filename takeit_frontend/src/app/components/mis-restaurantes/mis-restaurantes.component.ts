import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-restaurantes',
  templateUrl: './mis-restaurantes.component.html',
  styleUrls: ['./mis-restaurantes.component.css']
})
export class MisRestaurantesComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {

  }

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },

  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }

}

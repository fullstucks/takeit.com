import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrar-restaurantes-stats',
  templateUrl: './administrar-restaurantes-stats.component.html',
  styleUrls: ['./administrar-restaurantes-stats.component.css']
})
export class AdministrarRestaurantesStatsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [33, 21, 32, 13, 6, 8, 3, 12, 1], label: 'Cantidad de Reservas' },

  ];

  chartLabels = ['Enero','Febrero','Marzo','Abril','Mayo','Junio', 'Julio', 'Agosto', 'Septiembre'];

  onChartClick(event) {
    console.log(event);
  }

  pieData = [
    { data: [38, 22, 40]}
  ];

  pieLabels = ['Restaurante 1','Restaurante 2','Restaurante 3'];

  pieOptions = {
    responsive: true
  };

  barData = [
    { data: [38, 22, 40]}
  ];

  barLabels = ['Restaurante 1','Restaurante 2','Restaurante 3'];

  barOptions = {
    responsive: true
  };

}

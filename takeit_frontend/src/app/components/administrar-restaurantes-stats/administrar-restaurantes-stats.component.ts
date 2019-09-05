import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { TakeitdataService } from 'src/app/services/takeitdata.service';
import { Reserva } from 'src/app/models/reserva';


@Component({
  selector: 'app-administrar-restaurantes-stats',
  templateUrl: './administrar-restaurantes-stats.component.html',
  styleUrls: ['./administrar-restaurantes-stats.component.css']
})
export class AdministrarRestaurantesStatsComponent implements OnInit {

  restaurantes: Restaurant[] = []
  constructor(private takeitDataService: TakeitdataService) { }

  ngOnInit() {
    this.takeitDataService.getRestaurantesFavOrOwned()
      .subscribe(
        data => {
          this.restaurantes = data
          this.plotData()
        }
      );
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
    { data: []}
  ];

  barLabels = [];

  barOptions = {
    responsive: true
  };

  plotData() {

    let best_restaurants = []
    if (this.restaurantes.length >= 3){
      best_restaurants = this.restaurantes.sort((r1, r2) => r1.calificacion_prom - r2.calificacion_prom).slice(0, 3);
      
    }
    else {
      best_restaurants = this.restaurantes.sort((r1, r2) => r1.calificacion_prom - r2.calificacion_prom).slice (0, this.restaurantes.length+1);
    }
    best_restaurants.forEach(r => {
      this.barData[0]['data'].push(r.calificacion_prom);
      this.barLabels.push(r.nombre);
    });
    
  }

}

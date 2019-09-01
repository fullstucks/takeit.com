import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResultsComponent } from './components/results/results.component';
import { InfoRestauranteComponent } from './components/info-restaurante/info-restaurante.component';
import { GenerarReservaComponent } from './components/generar-reserva/generar-reserva.component';
import { MisReservasComponent } from './components/mis-reservas/mis-reservas.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { AdministrarRestaurantesComponent } from './components/administrar-restaurantes/administrar-restaurantes.component';
import { AdministrarRestaurantesEditarComponent } from './components/administrar-restaurantes-editar/administrar-restaurantes-editar.component';
import { AdministrarRestaurantesAgregarComponent } from './components/administrar-restaurantes-agregar/administrar-restaurantes-agregar.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'quienessomos', component: QuienesSomosComponent},
  {path: 'results', component:ResultsComponent},
  {path: 'infoRestaurante/:id', component:InfoRestauranteComponent},
  {path: 'generarReserva/:id', component: GenerarReservaComponent},
  {path: 'signup', component: SignupFormComponent},
  {path: 'misReservas', component:MisReservasComponent},
  {path: 'administrarRestaurantes', component: AdministrarRestaurantesComponent},
  {path: 'administrarRestaurantes/editar/:restaurante_id', component: AdministrarRestaurantesEditarComponent},
  {path: 'administrarRestaurantes/agregar', component: AdministrarRestaurantesAgregarComponent},
  {path: '**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

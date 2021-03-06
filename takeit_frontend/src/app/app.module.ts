import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from "@angular/common/http";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ChartsModule} from 'ng2-charts';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ResultsComponent } from './components/results/results.component';
import { TopgyeComponent } from './components/home/topgye/topgye.component';
import { TopzonesComponent } from './components/home/topzones/topzones.component';
import { SearchComponent } from './components/shared/search/search.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { InfoRestauranteComponent } from './components/info-restaurante/info-restaurante.component';
import { GenerarReservaComponent } from './components/generar-reserva/generar-reserva.component';
import { EscogerEntradasComponent } from './components/generar-reserva/entradas/escoger-entradas.component';
import { ConfirmarReservaComponent } from './components/generar-reserva/confirmar/confirmar-reserva.component';
import { MisReservasComponent } from './components/mis-reservas/mis-reservas.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NoticiasComponent } from './components/home/noticias/noticias.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { AdministrarRestaurantesComponent } from './components/administrar-restaurantes/administrar-restaurantes.component';
import { AdministrarRestaurantesAgregarComponent } from './components/administrar-restaurantes-agregar/administrar-restaurantes-agregar.component';
import { AdministrarRestaurantesEditarComponent } from './components/administrar-restaurantes-editar/administrar-restaurantes-editar.component';
import { AdministrarRestaurantesPlanificarComponent } from './components/administrar-restaurantes-planificar/administrar-restaurantes-planificar.component';
import { AdministrarRestaurantesStatsComponent } from './components/administrar-restaurantes-stats/administrar-restaurantes-stats.component';
import { AdministrarReservasComponent } from './components/administrar-reservas/administrar-reservas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ResultsComponent,
    TopgyeComponent,
    TopzonesComponent,
    SearchComponent,
    FooterComponent,
    InfoRestauranteComponent,
    GenerarReservaComponent,EscogerEntradasComponent,ConfirmarReservaComponent,
    MisReservasComponent,
    QuienesSomosComponent,
    NotFoundComponent,
    NoticiasComponent,
    SignupFormComponent,
    AdministrarRestaurantesComponent,
    AdministrarRestaurantesAgregarComponent,
    AdministrarRestaurantesEditarComponent,
    AdministrarRestaurantesPlanificarComponent,
    AdministrarRestaurantesStatsComponent,
    AdministrarReservasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

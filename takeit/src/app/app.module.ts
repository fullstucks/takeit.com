import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ResultsComponent } from './components/results/results.component';
import { TopgyeComponent } from './components/home/topgye/topgye.component';
import { TopzonesComponent } from './components/home/topzones/topzones.component';
import { SearchComponent } from './components/shared/search/search.component';
import { FooterComponent } from './components/shared/footer/footer.component';

import {FormsModule} from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { InfoRestauranteComponent } from './components/info-restaurante/info-restaurante.component';
import { GenerarReservaComponent } from './components/generar-reserva/generar-reserva.component';
import { MisReservasComponent } from './components/mis-reservas/mis-reservas.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
    GenerarReservaComponent,
    MisReservasComponent,
    QuienesSomosComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LeafletModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

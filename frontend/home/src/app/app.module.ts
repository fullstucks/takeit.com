import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopgyeComponent } from './topgye/topgye.component';
import { TopzonesComponent } from './topzones/topzones.component';

@NgModule({
  declarations: [
    AppComponent,
    TopgyeComponent,
    TopzonesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

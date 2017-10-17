import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';

import { CarInfoComponent } from './car/car-info.component';
import { CarComponent } from './car/car.component';
import { CarService } from './car.service';

//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { BikesDatabaseService } from './bikes-database.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { AppRoutingModule } from './app-routing/app-routing.module';
// import { MaterialModule } from '@angular/material';
import { routing } from './app.routes';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent, 
    CarComponent,
    CarInfoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(BikesDatabaseService),
    //MaterialModule.forRoot(),
    //AppRoutingModule,
    BrowserAnimationsModule,
   // MaterialModule
   routing
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }

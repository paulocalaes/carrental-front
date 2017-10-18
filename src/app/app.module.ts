import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';

import { CarInfoComponent } from './car/car-info.component';
import { CarViewComponent } from './car/car-view.component';
import { CarAddComponent } from './car/car-add.component';
import { CarComponent } from './car/car.component';

//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { BikesDatabaseService } from './bikes-database.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { AppRoutingModule } from './app-routing/app-routing.module';
// import { MaterialModule } from '@angular/material';
import { routing } from './app.routes';
import { LoginComponent } from './login/login.component';
import { FilterPipe} from '../filter.pipe';

@NgModule({
  declarations: [
    AppComponent, 
    CarComponent,
    CarInfoComponent,
    CarViewComponent,
    CarAddComponent,
    LoginComponent,
    FilterPipe
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
   routing,
   ReactiveFormsModule 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

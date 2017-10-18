// ====== ./app/app.routes.ts ======

// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarInfoComponent } from './car/car-info.component';
import { CarViewComponent } from './car/car-view.component';
import { CarAddComponent } from './car/car-add.component';
import { CarComponent } from './car/car.component';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes  = [
  { path: '', component: LoginComponent }, 	
  { path: 'car/:id', component: CarInfoComponent },
  { path: 'car/view/:id', component: CarViewComponent },
  { path: 'car/add', component: CarAddComponent },
  { path: 'cars', component: CarComponent },
  { path: '**', redirectTo: ''}
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];
export const routing = RouterModule.forRoot(appRoutes);
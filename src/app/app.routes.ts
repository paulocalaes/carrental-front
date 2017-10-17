// ====== ./app/app.routes.ts ======

// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarInfoComponent } from './car/car-info.component';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes  = [
  { path: '', component: LoginComponent }, 	
  { path: 'cars', component: CarInfoComponent },
  { path: '**', redirectTo: ''}
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];
export const routing = RouterModule.forRoot(appRoutes);
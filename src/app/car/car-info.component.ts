import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Location } from '@angular/common';
 
import { Car } from '../car';
import { CarService } from '../car.service'
 
 
@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {
 
  car: Car;
 
  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { 
    let token = localStorage.getItem("token");
    if(!token){
      this.router.navigateByUrl("");
    }
  }
 
  ngOnInit(): void {
    //this.route.params.switchMap((params: Params) => this.carService.getCar(+params['id']))
    //  .subscribe(car => this.car = car);
    
  }
  updateCar(): void {
    this.carService.updateCar(this.car);
    this.goBack();
  }
  goBack(): void {
    this.location.back();
  }
 
}
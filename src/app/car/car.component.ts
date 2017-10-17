import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { CarService } from '../car.service';



@Component({
  selector: 'app-cars',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[];
  selectedCar: Car;
  newCar: Car;

  constructor(private router: Router, private carService: CarService) {

  }

  ngOnInit() {
    this.carService.getCars().then(cars => this.cars = cars);
    this.newCar = new Car();
  }

  createCar(car: Car): void {

    this.carService.createCar(car)
      .then(car => {
        this.cars.push(car);
        this.selectedCar = null;
      });
  }

  deleteCar(car: Car): void {
    this.carService
      .deleteCar(car)
      .then(() => {
        this.cars = this.cars.filter(b => b !== car);
        if (this.selectedCar === car) { this.selectedCar = null; }
      });
  }

  showInfo(car: Car): void {
    this.selectedCar = car;
    this.router.navigate(['/information', this.selectedCar.id]);
  }
}
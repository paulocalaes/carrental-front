import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Car } from '../car';
import { Http, Headers,RequestOptions } from '@angular/http';
import { slideInDownAnimation } from '../../../animations';


@Injectable()
@Component({
  selector: 'app-cars',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],  
  animations: [ slideInDownAnimation ]
})
export class CarComponent implements OnInit {

  cars: Car[];
  selectedCar: Car;
  newCar: Car;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _http: Http
    ) { }

  ngOnInit() {
    //this.carService.getCars().then(cars => this.cars = cars);
    let token = localStorage.getItem("token");
        if(!token){
          this.router.navigateByUrl("");
      }      

      let myHeaders=new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer '+token);
      let options = new RequestOptions({ headers: myHeaders });

      this._http.get(
          'http://127.0.0.1:8000/api/cars', 
           options
        ).subscribe( 
          r=>{
            let data = r.json();            
            console.log(data.id);
            this.cars = data; 
          },
          error=>{
            if( error.status == 401){
              console.error( "Unauthorized");
              this.router.navigateByUrl(''); 
            }
          }
      );
    this.newCar = new Car();
  }

  createCar(car: Car): void {

   // this.carService.createCar(car)
   //   .then(car => {
    //    this.cars.push(car);
    //    this.selectedCar = null;
     // });
  }

  deleteCar(id:number, index:number): void {
    let token = localStorage.getItem("token");
    if(!token){
          this.router.navigateByUrl("");
    }else{
      let myHeaders=new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer '+token);
      let options = new RequestOptions({ headers: myHeaders });
    this._http.delete(
          'http://127.0.0.1:8000/api/cars/'+id, 
           options
        ).subscribe( 
          r=>{
            let data = r.json();            
            console.log("Deleted");
            this.cars.splice(index, 1);
          },
          error=>{
            if( error.status == 401){
              console.error( "Unauthorized");
              this.router.navigateByUrl(''); 
            }
          }
      );
    }     

      
         
  }

  showInfo(car: Car): void {
    this.selectedCar = car;
    this.router.navigate(['/information', this.selectedCar.id]);
  }

  updateCar(car: Car): void {
    this.selectedCar = car;
    this.router.navigateByUrl('/car/'+this.selectedCar.id);
  }
}
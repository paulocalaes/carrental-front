import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Car } from '../car';
import { Http, Headers,RequestOptions } from '@angular/http';
import { slideInDownAnimation } from '../../../animations';
import { API } from '../api';


@Injectable()
@Component({
  selector: 'app-cars',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],  
  animations: [ slideInDownAnimation ]
})
export class CarComponent implements OnInit {
  private api:API = new API();
  cars: Car[];
  selectedCar: Car;
  newCar: Car;
  modalCarname:String="";
  modalCarId:number=-1;
  modalCarIndex:number=-1;
  showModal=false;
  updated=false;

public searchText:string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _http: Http
    ) { 

  }

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
          this.api.url+'/api/cars', 
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
  closeModal(){ this.showModal = false;}
  closeAlert(){ this.updated = false;}
  deleteCarModal(car, index){
      this.modalCarname= car.make+" - "+car.model;
      this.modalCarId=car.id;
      this.modalCarIndex=index;
      this.showModal=true;
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
          this.api.url+'/api/cars/'+id, 
           options
        ).subscribe( 
          r=>{
            let data = r.json();            
            console.log("Deleted");
            this.cars.splice(index, 1);
            this.closeModal();
            this.updated=true;
            window.scrollTo(0,0);
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
}
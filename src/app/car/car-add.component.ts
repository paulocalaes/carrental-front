import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Car } from '../car';
import { slideInDownAnimation } from '../../../animations';


 
@Injectable()
@Component({
  selector: 'app-car-add',
  styleUrls: ['./car-add.component.css'],
  templateUrl: './car-add.component.html',  
  animations: [ slideInDownAnimation ]
})
export class CarAddComponent implements OnInit {
    make:string="";
    model:string="";
    owner:string="";
    description:string="";
    horsepower:string="";
    number_of_doors:string="";
    number_of_seats:string="";
    transmission:string="";
    fuel:string=""; 
    token:string="";

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private _http: Http,

  ) {  }
 
  ngOnInit(): void {
      let token = localStorage.getItem("token");
        if(!token){
          this.router.navigateByUrl("");
      }      

      let myHeaders=new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer '+token);
      let options = new RequestOptions({ headers: myHeaders });
  }

  addCar(id): void {
    let token = localStorage.getItem("token");
        if(!token){
          this.router.navigateByUrl("");
      }
      this._http.post(
          'http://127.0.0.1:8000/api/cars', 
          {
            api_token: token,
            make:this.make, 
            model:this.model,
            owner:this.owner,
            description:this.description,
            horsepower:this.horsepower,
            number_of_doors:this.number_of_doors,
            number_of_seats:this.number_of_seats,
            transmission:this.transmission,
            fuel:this.fuel
          }
        ).subscribe(
          r=>{
            let data = r.json();
            console.log("Inserted");             
          },
          error=>{
            if( error.status == 422){
              console.error( "Error");
            }
          }
        );

    //this.goBack();
  }
 
}
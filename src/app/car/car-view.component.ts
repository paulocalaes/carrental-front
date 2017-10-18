import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Car } from '../car';
import { slideInDownAnimation } from '../../../animations';


 
@Injectable()
@Component({
  selector: 'app-car-view',
  styleUrls: ['./car-view.component.css'],
  templateUrl: './car-view.component.html',  
  animations: [ slideInDownAnimation ]
})
export class CarViewComponent implements OnInit {
 
  car: Car;
   token:string="";
   public star = 4;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private _http: Http,

  ) {  }
 
  ngOnInit(): void {
      let id = this.route.snapshot.params["id"];
      let token = localStorage.getItem("token");
        if(!token){
          this.router.navigateByUrl("");
      }      

      let myHeaders=new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer '+token);
      let options = new RequestOptions({ headers: myHeaders });

      this._http.get(
          'http://api.triviasistemas.com.br/api/cars/'+id, 
           options
        ).subscribe( 
          r=>{
            let data = r.json();            
            console.log(data.id);
            this.car = data; 
            this.star = data.rate;
          },
          error=>{
            if( error.status == 401){
              console.error( "Unauthorized");
              this.router.navigateByUrl(''); 
            }
          }
      );
  }
  updateRate(id){
    let token = localStorage.getItem("token");
        if(!token){
          this.router.navigateByUrl("");
      }
      this._http.put(
          'http://api.triviasistemas.com.br/api/cars/'+id, 
          {
            api_token: token,
            /*make:this.car.make, 
            model:this.car.model,
            owner:this.car.owner,
            description:this.car.description,
            horsepower:this.car.horsepower,
            number_of_doors:this.car.number_of_doors,
            number_of_seats:this.car.number_of_seats,
            transmission:this.car.transmission,
            fuel:this.car.fuel,
            video:this.car.video*/
            rate:this.star
          }
        ).subscribe(
          r=>{
            let data = r.json();
            console.log("Atualizou");             
          },
          error=>{
            if( error.status == 422){
              console.error( "DEU PAU");
            }
          }
        );
  } 
}
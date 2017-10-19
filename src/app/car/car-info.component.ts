import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Car } from '../car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { API } from '../api';

 
@Injectable()
@Component({
  selector: 'app-car-info',
  styleUrls: ['./car-info.component.css'],
  templateUrl: './car-info.component.html'
})
export class CarInfoComponent implements OnInit {

  private api:API = new API();
  rForm: FormGroup;
  post:any;
  titleAlert:string = 'This field is required';
 
 updated = false;
   id;
    make:String="";
    model:string="";
    owner:string="";
    description:string="";
    horsepower:string="";
    number_of_doors:string="";
    number_of_seats:string="";
    transmission:string="";
    fuel:string=""; 
    token:string="";
    video:string="";

    car:Car;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private _http: Http,
     private fb: FormBuilder

  ) { 
    this.car = new Car();
    this.rForm = fb.group({
      'make' : [null, Validators.required],
      'model' : [null, Validators.required],
      'owner' : [null, Validators.required],
      'description':'', 
      'horsepower':'', 
      'number_of_doors':[null, Validators.pattern('[0-9]')], 
      'number_of_seats':[null, Validators.pattern('[0-9]')],
      'transmission':'', 
      'fuel': '', 
      'video':''
    });

   }
 
  ngOnInit(): void {
      this.id = this.route.snapshot.params["id"];
      let token = localStorage.getItem("token");
        if(!token){
          this.router.navigateByUrl("");
      }      

      let myHeaders=new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer '+token);
      let options = new RequestOptions({ headers: myHeaders });

      this._http.get(
          this.api.url+'/api/cars/'+this.id, 
           options
        ).subscribe( 
          r=>{
            let data = r.json();            
            console.log(data.id);
            this.car = data; 
            this.rForm.setValue({
              make: this.car.make,
              model: this.car.model,
              owner: this.car.owner,
              description: this.car.description,
              horsepower: this.car.horsepower,
              number_of_doors: this.car.number_of_doors,
              number_of_seats: this.car.number_of_seats,
              transmission: this.car.transmission,
              fuel: this.car.fuel,
              video: this.car.video
            });
            
          },
          error=>{
            if( error.status == 401){
              console.error( "Unauthorized");
              this.router.navigateByUrl(''); 
            }
          }
      );
  }
  closeAlert(){ this.updated = false;}
  updateCar(post): void {
    let token = localStorage.getItem("token");
        if(!token){
          this.router.navigateByUrl("");
      }
      this._http.put(
          this.api.url+'/api/cars/'+this.id, 
          {
            api_token: token,
            make:post.make, 
            model:post.model,
            owner:post.owner,
            description:post.description,
            horsepower:post.horsepower,
            number_of_doors:post.number_of_doors,
            number_of_seats:post.number_of_seats,
            transmission:post.transmission,
            fuel:post.fuel,
            video:post.video
          }
        ).subscribe(
          r=>{
            let data = r.json();
            this.updated = true;
            console.log("Atualizou"); 
            window.scrollTo(0,0);            
          },
          error=>{
            if( error.status == 422){
              console.error( "Unauthorized");
            }
          }
        );

    //this.goBack();
  }
 
}
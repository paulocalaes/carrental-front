import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Headers,RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


 
@Injectable()
@Component({
  selector: 'app-car-add',
  styleUrls: ['./car-add.component.css'],
  templateUrl: './car-add.component.html'
})
export class CarAddComponent implements OnInit {


    rForm: FormGroup;
  post:any;
titleAlert:string = 'This field is required';

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
    video:string="";

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private _http: Http,
    private fb: FormBuilder

  ) { 

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
      'token':'', 
      'video':''
    });

   }
 
  ngOnInit(): void {
      let token = localStorage.getItem("token");
        if(!token){
          this.router.navigateByUrl("");
      }      
  }

  addCar(post): void {
    let token = localStorage.getItem("token");
        if(!token){
          this.router.navigateByUrl("");
      }
      this._http.post(
          'http://api.triviasistemas.com.br/api/cars', 
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
            console.log("Inserted");  
            window.location.replace('./cars');           
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
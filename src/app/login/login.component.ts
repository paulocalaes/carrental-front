import { Component, OnInit, Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm }   from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	  title = 'Car Rental';
    email:string="";
    password:string="";
    //name:string="";
  	private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private router: Router, private _http: Http) { }
  
  submit(form: NgForm):void{

      this._http.post(
          'http://127.0.0.1:8000/api/login', 
          {email:this.email,password:this.password}
        ).subscribe(
          r=>{
            let data = r.json();
            let token = data.data.api_token;
            let name = data.data.name;
            if( !!token ){
            	localStorage.setItem("token", token);
              localStorage.setItem("name", name);
            	console.log("REDIRECT");
              this.router.navigateByUrl('cars');  
            }

          },
          error=>{
            if( error.status == 422){
              console.error( "DEU PAU");
            }
          }
        );
  }

  ngOnInit() {
  }

}

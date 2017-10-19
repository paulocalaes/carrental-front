import { Component, OnInit, Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm }   from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { API } from '../api';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private api:API = new API();
	  title = 'Car Rental';

    rForm: FormGroup;
    post:any;
    titleAlert:string = 'This field is required';
    updated = false;

    email:string="";
    password:string="";
    //name:string="";
  	private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private router: Router, private _http: Http,private fb: FormBuilder) { 
    this.rForm = fb.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required]
      
    });
  }
  public name = localStorage.getItem("name");
  submit(post):void{

      this._http.post(
          this.api.url+'/api/login', 
          {email:post.email,password:post.password}
        ).subscribe(
          r=>{
            let data = r.json();
            let token = data.data.api_token;
            let name = data.data.name;
            if( !!token ){
            	localStorage.setItem("token", token);
              localStorage.setItem("name", name);
            	console.log("REDIRECT");
              window.location.reload();  
            }

          },
          error=>{
            this.updated = true;
          }
        );
  }

  ngOnInit() {
  }
closeAlert(){ this.updated = false;}
}

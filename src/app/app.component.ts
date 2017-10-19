import { Component, Injectable } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Login } from './login';
import { NgForm }   from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { API } from './api';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private api:API = new API();
    constructor(
    	private _http: Http,
    	private route: ActivatedRoute,
        private router: Router
    	){}
        private headers = new Headers({'Content-Type': 'application/json'});
        
  		public name = localStorage.getItem("name");

  	logout(): void {
  		let token = localStorage.getItem("token");
        if(!token){
          this.router.navigateByUrl("");
      }
	    this._http.post(

          this.api.url+'/api/logout', 
          {
            api_token: token,
          }
        ).subscribe(
          r=>{
            let data = r.json();
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            window.location.reload();
            console.log("Logout");             
          },
          error=>{
            if( error.status == 422 || error.status == 401){
              console.error( "Unauthorized");
            }
          }
        );
	    //this.router.navigateByUrl('/car/'+this.selectedCar.id);
  	}
}
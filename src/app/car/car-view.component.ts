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
          'http://127.0.0.1:8000/api/cars/'+id, 
           options
        ).subscribe( 
          r=>{
            let data = r.json();            
            console.log(data.id);
            this.car = data; 
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
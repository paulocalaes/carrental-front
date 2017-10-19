import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Car } from '../car';
import { slideInDownAnimation } from '../../../animations';
import {DomSanitizer} from '@angular/platform-browser';
import { API } from '../api';

 
@Injectable()
@Component({
  selector: 'app-car-view',
  styleUrls: ['./car-view.component.css'],
  templateUrl: './car-view.component.html',  
  animations: [ slideInDownAnimation ]
})
export class CarViewComponent implements OnInit {

   private api:API = new API();
   car: Car;
   token:string="";
   public star = 4;
   public video:string = 'ZuaqDvdPdoQ';
   public url;
   public youtube;
   baseUrl:string = "https://www.youtube.com/embed/";
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private _http: Http,
    private sanitizer: DomSanitizer

  ) { 
    this.car = new Car();
    //this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl+this.video);
 }
 
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
          this.api.url+'/api/cars/'+id, 
           options
        ).subscribe( 
          r=>{
            let data = r.json();            
            console.log(data.id);
            this.car = data; 
            this.star = data.rate;
            if(data.video){
              this.video = data.video;
              
            }
            
          },
          error=>{
            if( error.status == 401){
              console.error( "Unauthorized");
              this.router.navigateByUrl(''); 
            }
          }
      );
  }
  ngAfterContentChecked(){
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl+this.video);
  }
  updateRate(id){
    let token = localStorage.getItem("token");
        if(!token){
          this.router.navigateByUrl("");
      }
      this._http.put(
          this.api.url+'/api/cars/'+id, 
          {
            api_token: token,
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
import { Component, Injectable } from '@angular/core';
import { Login } from './login';
import { NgForm }   from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private _http: Http){}
        private headers = new Headers({'Content-Type': 'application/json'});
  
}
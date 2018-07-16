import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) { }

  getAct(){
    return this._http.get('/users')
  }

  getFarm(){
    return this._http.get('/farm')
  }
}

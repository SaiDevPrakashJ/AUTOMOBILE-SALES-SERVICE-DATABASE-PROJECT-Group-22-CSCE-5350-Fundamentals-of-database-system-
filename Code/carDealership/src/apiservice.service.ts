import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ApiserviceService {
  userLogged: any;
  dealerLogged:any
  apiUrl1 = 'http://localhost:3000/api/login';
  userId: any;
  constructor(private _http:HttpClient) { }

//Customer Login api call

loginUser(data:any):Observable<any>
{
  let userLogged =  this._http.post(`${this.apiUrl1}`,data);
  return userLogged;

}

//Dealer Login api call
apiUrl3 = 'http://localhost:3000/api/dealer/login'
dealerLoginUser(data:any):Observable<any>
{
  let dealerLogged =  this._http.post(`${this.apiUrl3}`,data);
  return dealerLogged;

}

//Dealer Dashboard api call
apiUrl4 = 'http://localhost:3000/api/dealer-dashboard';

getDealerData():Observable<any>
{
  let data = {
    "userId": ""
  }
  data.userId = this.userId;
  return this._http.post(`${this.apiUrl4}`,data)

}
//Customer Dashboard api call
apiUrl = 'http://localhost:3000/api/customer-dashboard';

getCustomerData():Observable<any>
{
  let data = {
    "userId": ""
  }
  data.userId = this.userId;
  return this._http.post(`${this.apiUrl}`,data)

}

//Get vehicle details
apiUrl5 = 'http://localhost:3000/api/vehicles';
getVehicleInfo(){
  let data = {
    "dummy":"dummy"
  }
  return this._http.post(`${this.apiUrl5}`, data)
}

//Get customer tickets
apiurl2 = 'http://localhost:3000/api/service-tickets';
getCustomerTickets(){
  let data = {
    "userId": "" 
  }
  data.userId = this.userId;
  return this._http.post(`${this.apiurl2}`,data)
}

//get All tickets
apiurl6 = 'http://localhost:3000/api/all-service-tickets';
getAllTickets(){
  let data = {
    "userId": "" 
  }
  data.userId = this.userId;
  return this._http.post(`${this.apiurl6}`,data)
}

}

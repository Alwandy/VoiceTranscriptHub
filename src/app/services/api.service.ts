import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';


const APIURL = "http://localhost:4000";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Register API call 
  public register(registerPayload)
  {
    return this.http.post(APIURL + '/users/register', registerPayload, {observe: 'response'});
  }


  // Login API call 
  public login(loginPayload)
  {
    return this.http.post(APIURL + '/users/authenticate', loginPayload, {observe: 'response'});
  }
}
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
  public register(registerPayload) : Observable<boolean>
  {
    return this.http.post(APIURL + '/users/register', registerPayload).pipe(map(result => {return true}));;
  }


  // Login API call 
  public login(loginPayload): Observable<boolean>
  {
    return this.http.post<{token: string, username: string, _id: string}>(APIURL + '/users/authenticate', loginPayload).pipe(map(result => {localStorage.setItem('access_token', result.token); localStorage.setItem('username', result.username); localStorage.setItem('id', result._id); return true}));
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
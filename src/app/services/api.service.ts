import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recording } from './recording.model'

const APIURL = "https://voicetranscriptbackend.azurewebsites.net";

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

  public createRecording(recordingPayload) : Observable<boolean> 
  {
    var header = { headers: new HttpHeaders().set('Authorization',  'Bearer ' + localStorage.getItem('access_token'))}
    return this.http.post(APIURL + '/recordings/create', recordingPayload, header).pipe(map(result => {return true}))
  }

  public getRecordings() : Observable<Recording> 
  {
    var header = { headers: new HttpHeaders().set('Authorization',  'Bearer ' + localStorage.getItem('access_token'))}
    return this.http.get<Recording>(APIURL + '/recordings/' + localStorage.getItem('id'), header).pipe(map(result => {return result}));
  }

  public deleteRecording(id) : Observable<boolean> 
  {
    var header = { headers: new HttpHeaders().set('Authorization',  'Bearer ' + localStorage.getItem('access_token'))}
    return this.http.delete(APIURL + '/recordings/' + id, header).pipe(map(result => {return true}));
  }

}
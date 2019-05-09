import { Component } from '@angular/core';
import {ApiService} from './services/api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'VoiceTranscriptHub';
  public username = localStorage.getItem("username");
  
  constructor(private api: ApiService, private router: Router) {}

  logout()
  {
    this.api.logout();
    this.router.navigate(['/']);
  }
  ngOnInit() {
  }
}

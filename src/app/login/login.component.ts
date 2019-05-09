import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  
  reactiveForm: FormGroup;
  public error: string;

  constructor(public apiService: ApiService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      username:   [''],
      password:   ['']
    });
  }

  onSubmit() {
    this.apiService.login(this.reactiveForm.value).pipe(first()).subscribe(result => this.router.navigate(['/']), err => this.error ='Could not authenticate')
  }

}

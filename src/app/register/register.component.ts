import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  
  reactiveForm: FormGroup;
  public error: string;

  constructor(public apiService: ApiService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      username:   [''],
      email:      [''],
      password:   [''], 
      firstName:  [''],
      lastName:   ['']
    });
  }
  onSubmit() {
    this.apiService.register(this.reactiveForm.value).pipe(first()).subscribe(result => this.router.navigate(['/']), err => this.error ='Registration failed, please double check your details')
  }
}

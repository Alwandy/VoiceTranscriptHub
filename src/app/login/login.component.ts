import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  
  reactiveForm: FormGroup;
  constructor(public apiService: ApiService, private fb: FormBuilder) { }

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
    this.apiService.login(this.reactiveForm.value).subscribe(res => {console.log(res.body["username"])}, err => {console.log(err.error)});
  }

}

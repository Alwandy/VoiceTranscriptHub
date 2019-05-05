import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor(public apiService: ApiService, private fb: FormBuilder) { }

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
    this.apiService.register(this.reactiveForm.value).subscribe(res => {console.log()}, err => {console.log(err.error)});
  }
}

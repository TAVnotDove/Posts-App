import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form = this.fb.group({
    email: [],
    password: [],
    validators: []
  })

  constructor(private fb: FormBuilder){}
  
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem("user")!);

    this.form = this.fb.group({
      email: [{
        value: user.email,
        disabled: true
      }],
      password: [{
        value: user.password,
        disabled: true
      }],
      validators: []
    })
  }
}

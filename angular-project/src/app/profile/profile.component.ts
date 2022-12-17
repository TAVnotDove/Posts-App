import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { dateConverter } from '../utils/date-converter.util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form = this.fb.group({
    username: [""],
    email: [""],
    created: [""],
  })

  constructor(private fb: FormBuilder){}
  
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem("user")!);

    this.form = this.fb.group({
      username: [{
        value: user.username,
        disabled: true,
      }],
      email: [{
        value: user.email,
        disabled: true,
      }],
      created: [{
        value: dateConverter(user._createdOn),
        disabled: true,
      }]
    })
  }
}

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    email: [],
    password: [],
    validators: []
  })

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router){}

  login(): void {
    const userData = this.form.value

    this.userService.loginUser({
      email: userData.email!,
      password: userData.password!
    }).subscribe({
        next: (v) => {
          localStorage.setItem("user", JSON.stringify(v));
          this.router.navigate(["/"]);
        },
        error: (e) => {
          console.error(e)
        }
    })
  }
}

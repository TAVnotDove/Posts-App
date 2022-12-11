import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    username: [],
    email: [],
    passwords: this.fb.group({
      password: [],
      confirmPassword: []
    }, {
      validators: []
    })
  })

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router){}

  register(): void {
    const userData = this.form.value
    
    this.userService.registerUser({
      username: userData.username!,
      email: userData.email!,
      password: userData.passwords?.password!
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

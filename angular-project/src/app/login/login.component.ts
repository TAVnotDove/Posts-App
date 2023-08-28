import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ThemesService } from '../services/themes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error: string | null = null

  form = this.fb.group({
    email: ["", [Validators.required]],
    password: ["", [Validators.required]],
  })

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private themesService: ThemesService) { }

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
        if (e.status === 0) {
          this.error = "The server failed to connect."
        } else if (e.status === 403) {
          this.error = "Email or password isn't correct."
        } else {
          console.error(e)
        }
      }
    })
  }

  getTheme(): string {
    return this.themesService.getTheme()
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { ThemesService } from './services/themes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userIsLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private themesService: ThemesService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.userIsLoggedIn = this.userService.authenticateUser();
      }
    });
  }

  getTheme(): string {
    return this.themesService.getTheme();
  }
}

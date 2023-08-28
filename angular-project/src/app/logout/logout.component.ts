import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemesService } from '../services/themes.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private router: Router, private themesService: ThemesService) { }

  logout(): void {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  getTheme(): string {
    return this.themesService.getTheme()
  }
}

import { Component } from '@angular/core';
import { ThemesService } from '../services/themes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private themesService: ThemesService) { }

  getTheme(): string | null {
    return this.themesService.getTheme()
  }
}

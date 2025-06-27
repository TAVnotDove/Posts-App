import { Component, Input } from '@angular/core';
import { ThemesService } from '../../services/themes.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() isLoggedIn: boolean = false

  constructor(private themesService: ThemesService) { }

  changeTheme(): void {
    this.themesService.changeTheme()
  }

  getTheme(): string {
    return this.themesService.getTheme()
  }
}

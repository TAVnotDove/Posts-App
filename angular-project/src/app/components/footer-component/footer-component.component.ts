import { Component } from '@angular/core';
import { ThemesService } from '../../services/themes.service';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.css']
})
export class FooterComponentComponent {
  constructor(private themesService: ThemesService) { }

  getTheme(): string | null {
    return this.themesService.getTheme()
  }
}

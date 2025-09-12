import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PreferenceService } from '../../services/preference.service';
import { PageRouteService } from '../../services/page-route.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMenuOpen = false;

  get currentLanguage() {
    switch (this._preferenceService.language) {
      case 'en':
        return 'english';
      case 'uk':
        return 'ukrainian';
    }
  }

  get currentTheme() {
    return this._preferenceService.theme === 'light' ? 'fa-sun' : 'fa-moon';
  }

  private _preferenceService = inject(PreferenceService);
  private _pageRouteService = inject(PageRouteService);

  @HostBinding('class.menu-open') get menuOpen() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
    }
    return this.isMenuOpen;
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
  }

  toggleLanguage() {
    this._preferenceService.toggleLanguage();
  }

  toggleTheme() {
    this._preferenceService.toggleTheme();
  }

  scrollTo(section: string) {
    this._pageRouteService.scrollTo(section);
    this.isMenuOpen = false;
  }
}

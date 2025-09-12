import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportedLanguages } from '../models/supported-languages'
import { USER_PREFERENCES } from '../tokens/user-preferences.token'
import { Preferences } from '../models/preferences'
import { PREFTS_STORAGE_KEY } from '../models/constants'

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {

  get language(): SupportedLanguages {
    return this.prefs.lang;
  }

  get theme(): 'light' | 'dark' {
    return this.prefs.theme;
  }

  constructor(
    private translateService: TranslateService,
    @Inject(USER_PREFERENCES) private prefs: Preferences
  ) {}

  init() {
    this.translateService.addLangs(['en', 'uk']);
    this.translateService.use(this.prefs.lang);
    document.documentElement.setAttribute('data-theme', this.prefs.theme);
  }

  toggleLanguage() {
    const language = this.prefs.lang === 'en' ? 'uk' : 'en';
    this.prefs.lang = language;
    this.translateService.use(language);
    this.savePreferences();
  }

  toggleTheme() {
    const theme = this.prefs.theme === 'light' ? 'dark' : 'light';
    this.prefs.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    this.savePreferences();
  }

  private savePreferences() {
    localStorage.setItem(PREFTS_STORAGE_KEY, JSON.stringify(this.prefs));
  }
}

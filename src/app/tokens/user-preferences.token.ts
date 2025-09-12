import { InjectionToken } from '@angular/core'
import { Preferences } from '../models/preferences'
import { DEFAULT_LANGUAGE, DEFAULT_THEME, PREFTS_STORAGE_KEY } from '../models/constants'

export const USER_PREFERENCES = new InjectionToken<Preferences>(
  'user.preferences',
  {
    providedIn: 'root',
    factory: () => {
      const savedPrefs = localStorage.getItem(PREFTS_STORAGE_KEY);
      return savedPrefs
        ? JSON.parse(savedPrefs)
        : { theme: DEFAULT_THEME, lang: DEFAULT_LANGUAGE };
    },
  }
);

import { SupportedLanguages } from './supported-languages'

export interface Preferences {
  theme: 'light' | 'dark';
  lang: SupportedLanguages;
}

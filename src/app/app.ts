import { Component, inject, OnInit } from '@angular/core';
import { PreferenceService } from './services/preference.service'
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Main } from "./components/main/main";
import { PageRouteService } from './services/page-route.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Header, Footer, Main]
})
export class App implements OnInit {
  private _preferenceService = inject(PreferenceService);
  private _pageRouteService = inject(PageRouteService);

  ngOnInit() {
    this._preferenceService.init();
    this._pageRouteService.scrollToHashOnLoad();
  }
}

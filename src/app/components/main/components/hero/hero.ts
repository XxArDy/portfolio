import { Component, inject } from '@angular/core';
import { FadeInDirective } from '../../../../directives/fade-in.directive';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PageRouteService } from '../../../../services/page-route.service';
import { HeroTitleComponent } from './components/hero-title/hero-title';
import { HeroTypewriterComponent } from './components/hero-typewriter/hero-typewriter';
import { HeroMetricsComponent } from './components/hero-metrics/hero-metrics';
import { HeroCTAComponent } from './components/hero-cta/hero-cta';
import { SocialLinksComponent } from '../../../social-links/social-links';

@Component({
  selector: 'app-hero',
  imports: [
    FadeInDirective,
    TranslateModule,
    CommonModule,
    HeroTitleComponent,
    HeroTypewriterComponent,
    HeroMetricsComponent,
    HeroCTAComponent,
    SocialLinksComponent,
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  typedText$!: Observable<string>;

  private _pageRouteService = inject(PageRouteService);

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'MaksymStepaniuk_CV.pdf';
    link.download = 'MaksymStepaniuk_CV.pdf';
    link.click();
  }

  navigateToProject() {
    this._pageRouteService.scrollTo('projects');
  }
}

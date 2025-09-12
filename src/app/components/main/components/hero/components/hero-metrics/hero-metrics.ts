import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-hero-metrics',
  template: `
    <div class="metrics">
      <div class="metric">
        <span class="metric-number">{{ currentExperience }}</span>
        <span class="metric-label">{{
          'hero.yearsExperience' | translate
        }}</span>
      </div>
      <div class="metric">
        <span class="metric-number">{{ currentProjects$ | async }}</span>
        <span class="metric-label">{{
          'hero.projectsCompleted' | translate
        }}</span>
      </div>
    </div>
  `,
  imports: [TranslateModule, CommonModule],
  styleUrl: './hero-metrics.scss',
})
export class HeroMetricsComponent implements OnInit {
  currentExperience = 0;
  currentProjects$: Observable<number> | undefined;

  private _startExperience = new Date(2024, 1);

  private _http = inject(HttpClient);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.currentExperience = this._calculateYearsOfExperience();
    this.currentProjects$ = this._fetchGitHubReposCount();
  }

  private _fetchGitHubReposCount(): Observable<number> {
    return this._http
      .get<{ public_repos: number }>('https://api.github.com/users/XxArDy')
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        map((data) => data.public_repos)
      );
  }

  private _calculateYearsOfExperience(): number {
    const now = new Date();
    let years = now.getFullYear() - this._startExperience.getFullYear();
    const monthDiff = now.getMonth() - this._startExperience.getMonth();

    if (monthDiff >= 6) {
      years += 1;
    }

    return years;
  }
}

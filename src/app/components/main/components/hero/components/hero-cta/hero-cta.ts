import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-hero-cta',
  template: `
    <div class="cta-buttons fade-in">
      <a (click)="viewProjects.emit()" class="btn btn-outline magnetic">
        <span class="btn-text">
          <i class="fas fa-code"></i> {{ 'hero.viewProjects' | translate }}
        </span>
        <span class="btn-background"></span>
      </a>
      <button class="btn btn-outline magnetic" (click)="downloadCV.emit()">
        <span class="btn-text">
          <i class="fas fa-download"></i> {{ 'hero.downloadCV' | translate }}
        </span>
        <span class="btn-background"></span>
      </button>
    </div>
  `,
  styleUrl: './hero-cta.scss',
  imports: [TranslateModule],
})
export class HeroCTAComponent {
  @Output() viewProjects = new EventEmitter<void>();
  @Output() downloadCV = new EventEmitter<void>();
}

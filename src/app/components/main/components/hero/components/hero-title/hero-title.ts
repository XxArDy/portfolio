import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-title',
  template: `
    <h1 class="hero-title">
      <span class="name gradient-text">{{ name }}</span>
    </h1>
  `,
  styleUrl: './hero-title.scss',
})
export class HeroTitleComponent {
  @Input() name!: string;
}

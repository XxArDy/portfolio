import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-hero-title',
  template: `
    <div class="hero-title">
      <p class="hero-label">Angular &amp; .NET</p>
      <h1 class="name">
        <span class="scramble-text" [class.resolved]="resolved">{{ displayName }}</span>
      </h1>
    </div>
  `,
  styleUrl: './hero-title.scss',
})
export class HeroTitleComponent implements OnChanges, OnDestroy {
  @Input() name!: string;

  displayName = '';
  resolved = false;

  private interval: ReturnType<typeof setInterval> | null = null;
  private readonly _cdr = inject(ChangeDetectorRef);

  // Chars for scramble — generic symbols visible in any encoding
  private readonly chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&*+=/\\';

  ngOnChanges() {
    if (this.name) {
      this.startScramble();
    }
  }

  ngOnDestroy() {
    this.clearInterval();
  }

  private clearInterval() {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private startScramble() {
    this.clearInterval();
    this.resolved = false;

    const target = this.name;
    let iter = 0;
    // How many chars to reveal per frame (spread over ~1.6s at 40ms/frame)
    const step = target.length / (1600 / 40);

    this.displayName = target
      .split('')
      .map((c) => (c === ' ' ? ' ' : this.randomChar()))
      .join('');

    this.interval = setInterval(() => {
      iter += step;
      this.displayName = target
        .split('')
        .map((c, i) => {
          if (c === ' ') return ' ';
          if (i < Math.floor(iter)) return c;
          return this.randomChar();
        })
        .join('');

      this._cdr.markForCheck();

      if (iter >= target.length) {
        this.displayName = target;
        this.resolved = true;
        this.clearInterval();
        this._cdr.markForCheck();
      }
    }, 40);
  }

  private randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

import { Component, inject, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TypewriterService } from '../../../../../../services/typewriter.service';

@Component({
  selector: 'app-hero-typewriter',
  template: `
    <div class="subtitle-container">
      <p class="subtitle typewriter">
        {{ typedText$ | async }}<span class="cursor">|</span>
      </p>
    </div>
  `,
  imports: [AsyncPipe],
  styleUrl: './hero-typewriter.scss',
})
export class HeroTypewriterComponent {
  @Input() set typedText(value: string) {
    this.typedText$ = this._typewriterService.typeText(
      value,
      this._typingSpeed
    );
  }

  typedText$!: Observable<string>;

  private _typingSpeed = 50;

  private _typewriterService = inject(TypewriterService);
}

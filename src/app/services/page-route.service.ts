import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PageRouteService {
  private router = inject(Router);
  private location = inject(Location);
  private animationId: number | null = null;
  private isAnimating = false;

  scrollTo(section: string) {
    const element = document.getElementById(section);
    if (element) {
      this.updateUrlHash(section);
      this.smoothScrollTo(element);
    }
  }

  scrollToHashOnLoad() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        this.scrollTo(hash);
      }, 100);
    }
  }

  private smoothScrollTo(element: HTMLElement) {
    const targetPosition =
      element.getBoundingClientRect().top + window.pageYOffset - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime: number | null = null;

    this.stopAnimation();
    this.isAnimating = true;

    this.addScrollListeners();

    const animation = (currentTime: number) => {
      if (!this.isAnimating) return;

      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = this.easeInOutCubic(progress);
      const currentPosition = startPosition + distance * ease;

      window.scrollTo(0, currentPosition);

      if (progress < 1 && this.isAnimating) {
        this.animationId = requestAnimationFrame(animation);
      } else {
        this.stopAnimation();
      }
    };

    this.animationId = requestAnimationFrame(animation);
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  public stopScrolling() {
    this.stopAnimation();
  }

  private stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isAnimating = false;
    this.removeScrollListeners();
  }

  private addScrollListeners() {
    window.addEventListener('wheel', this.handleUserInteraction, {
      passive: true,
    });
    window.addEventListener('touchstart', this.handleUserInteraction, {
      passive: true,
    });
    window.addEventListener('touchmove', this.handleUserInteraction, {
      passive: true,
    });
    window.addEventListener('keydown', this.handleKeyInteraction);
  }

  private removeScrollListeners() {
    window.removeEventListener('wheel', this.handleUserInteraction);
    window.removeEventListener('touchstart', this.handleUserInteraction);
    window.removeEventListener('touchmove', this.handleUserInteraction);
    window.removeEventListener('keydown', this.handleKeyInteraction);
  }

  private handleUserInteraction = () => {
    if (this.isAnimating) {
      this.stopAnimation();
    }
  };

  private handleKeyInteraction = (event: KeyboardEvent) => {
    const scrollKeys = [
      'ArrowUp',
      'ArrowDown',
      'PageUp',
      'PageDown',
      'Home',
      'End',
      'Space',
    ];

    if (scrollKeys.includes(event.code) && this.isAnimating) {
      this.stopAnimation();
    }
  };

  private updateUrlHash(section: string) {
    const url = this.router.createUrlTree([], { fragment: section }).toString();
    this.location.go(url);
  }
}

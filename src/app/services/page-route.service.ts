import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PageRouteService {
  private router = inject(Router);
  private location = inject(Location);
  private currentAnimationId: number | null = null;
  private isUserScrolling = false;
  private userScrollTimeout: any;

  scrollTo(section: string) {
    const element = document.getElementById(section);
    if (element) {

      this.updateUrlHash(section);

      this.cancelCurrentScroll();

      this.smoothScrollPolyfill(element);
    }
  }

  scrollToHashOnLoad() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          this.smoothScrollPolyfill(element);
        }
      }, 100);
    }
  }

  private smoothScrollPolyfill(element: HTMLElement) {
    const targetPosition = element.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start: number;
    let lastScrollPosition = startPosition;

    this.addScrollListeners();

    const step = (timestamp: number) => {
      if (this.isUserScrolling) {
        this.cancelCurrentScroll();
        return;
      }

      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressPercentage = Math.min(progress / duration, 1);

      const newPosition = startPosition + distance * this.easeInOutQuad(progressPercentage);

      const currentScrollPosition = window.pageYOffset;
      if (Math.abs(currentScrollPosition - lastScrollPosition) > 5 &&
          Math.abs(currentScrollPosition - newPosition) > 10) {
        this.cancelCurrentScroll();
        return;
      }

      window.scrollTo(0, newPosition);
      lastScrollPosition = newPosition;

      if (progress < duration) {
        this.currentAnimationId = window.requestAnimationFrame(step);
      } else {
        this.cleanupScrollListeners();
        this.currentAnimationId = null;
      }
    };

    this.currentAnimationId = window.requestAnimationFrame(step);
  }

  private addScrollListeners() {
    window.addEventListener('wheel', this.handleUserScroll, { passive: true });
    window.addEventListener('touchstart', this.handleUserScroll, { passive: true });
    window.addEventListener('touchmove', this.handleUserScroll, { passive: true });
    window.addEventListener('keydown', this.handleKeyScroll);
  }

  private cleanupScrollListeners() {
    window.removeEventListener('wheel', this.handleUserScroll);
    window.removeEventListener('touchstart', this.handleUserScroll);
    window.removeEventListener('touchmove', this.handleUserScroll);
    window.removeEventListener('keydown', this.handleKeyScroll);

    if (this.userScrollTimeout) {
      clearTimeout(this.userScrollTimeout);
      this.userScrollTimeout = null;
    }
  }

  private handleUserScroll = () => {
    this.isUserScrolling = true;

    if (this.userScrollTimeout) {
      clearTimeout(this.userScrollTimeout);
    }

    this.userScrollTimeout = setTimeout(() => {
      this.isUserScrolling = false;
    }, 150);
  };

  private handleKeyScroll = (event: KeyboardEvent) => {
    const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space'];

    if (scrollKeys.includes(event.code)) {
      this.handleUserScroll();
    }
  };

  private cancelCurrentScroll() {
    if (this.currentAnimationId) {
      window.cancelAnimationFrame(this.currentAnimationId);
      this.currentAnimationId = null;
    }

    this.cleanupScrollListeners();
    this.isUserScrolling = false;
  }

  private easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  public stopScrolling() {
    this.cancelCurrentScroll();
  }

  private updateUrlHash(section: string) {
    const url = this.router.createUrlTree([], { fragment: section }).toString();
    this.location.go(url);
  }
}

import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appFadeIn]',
})
export class FadeInDirective implements AfterViewInit {
  private _observer?: MutationObserver;
  private _fadeElements: HTMLElement[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.observeDomChanges();
    this.checkVisibility();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.checkVisibility();
  }

  private observeDomChanges() {
    this._observer = new MutationObserver(() => {
      this._fadeElements = [];
      this.checkVisibility();
    });

    this._observer.observe(this.el.nativeElement, {
      childList: true,
      subtree: true,
    });
  }

  private checkVisibility() {
    if (!this._fadeElements.length) {
      this._fadeElements = Array.from(
        this.el.nativeElement.querySelectorAll('.fade-in')
      );
    }

    this._fadeElements.forEach((element: HTMLElement) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible && elementBottom > 0) {
        this.renderer.addClass(element, 'visible');
      } else {
        this.renderer.removeClass(element, 'visible');
      }
    });
  }
}

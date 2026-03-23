import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { FadeInDirective } from '../../../../directives/fade-in.directive';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { PageRouteService } from '../../../../services/page-route.service';
import { HeroTitleComponent } from './components/hero-title/hero-title';
import { HeroTypewriterComponent } from './components/hero-typewriter/hero-typewriter';
import { HeroMetricsComponent } from './components/hero-metrics/hero-metrics';
import { HeroCTAComponent } from './components/hero-cta/hero-cta';
import { SocialLinksComponent } from '../../../social-links/social-links';

interface Particle {
  ox: number;
  oy: number;
  oz: number;
}

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
export class Hero implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private animationId = 0;
  private rotation = 0;
  private resizeObs?: ResizeObserver;

  private readonly _pageRouteService = inject(PageRouteService);

  ngAfterViewInit() {
    this.initCanvas();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
    this.resizeObs?.disconnect();
  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'MaksymStepaniuk_CV.pdf';
    link.download = 'MaksymStepaniuk_CV.pdf';
    link.click();
  }

  navigateToProject() {
    this._pageRouteService.scrollTo('projects');
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement!;

    const setSize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    setSize();

    this.resizeObs = new ResizeObserver(() => setSize());
    this.resizeObs.observe(container);

    const ctx = canvas.getContext('2d')!;
    const N = 72;
    const particles: Particle[] = [];

    // Fibonacci sphere — even distribution of points on sphere surface
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      particles.push({ ox: r * Math.cos(theta), oy: y, oz: r * Math.sin(theta) });
    }

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      this.rotation += 0.0025;
      const cosR = Math.cos(this.rotation);
      const sinR = Math.sin(this.rotation);

      const focal = 3.5;
      const sphereR = Math.min(w, h) * 0.42;
      const cx = w / 2;
      const cy = h / 2;

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const [cr, cg, cb] = isDark ? [6, 214, 214] : [8, 100, 120];

      // Project to 2D with perspective
      const proj = particles.map((p) => {
        const x = p.ox * cosR - p.oz * sinR; // Y-axis rotation
        const z = p.ox * sinR + p.oz * cosR;
        const scale = focal / (focal + z + 1);
        return {
          sx: cx + x * sphereR * scale,
          sy: cy + p.oy * sphereR * scale,
          z,
          scale,
        };
      });

      const maxD = sphereR * 0.52;

      // Connections
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const dx = proj[i].sx - proj[j].sx;
          const dy = proj[i].sy - proj[j].sy;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) {
            const a = ((1 - d / maxD) * 0.42 * ((proj[i].scale + proj[j].scale) * 0.5)).toFixed(3);
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${a})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(proj[i].sx, proj[i].sy);
            ctx.lineTo(proj[j].sx, proj[j].sy);
            ctx.stroke();
          }
        }
      }

      // Dots
      proj.forEach((p) => {
        const a = (Math.max(0, (p.z + 1) / 2) * 0.88).toFixed(3);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.scale * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`;
        ctx.fill();
      });
    };

    animate();
  }
}

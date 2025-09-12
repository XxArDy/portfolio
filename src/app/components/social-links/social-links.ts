import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLinksService } from '../../services/social-links.service';
import { MyLinks } from '../../models/my-links';

interface SocialLink {
  url: string;
  title: string;
  class: string;
  icon: string;
}


@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-links.html',
  styleUrl: './social-links.scss'
})
export class SocialLinksComponent implements OnInit {
  @Input() size: 'large' | 'small' = 'large';

  links: SocialLink[] = [];

  constructor(private _socialLinks: SocialLinksService) {}

  async ngOnInit() {
    const myLinks: MyLinks = await this._socialLinks.getLinks();
    this.links = [
      { url: myLinks.linkedin, title: 'LinkedIn', class: 'social-link linkedin', icon: 'fab fa-linkedin-in' },
      { url: myLinks.github, title: 'GitHub', class: 'social-link github', icon: 'fab fa-github' },
      { url: myLinks.instagram, title: 'Instagram', class: 'social-link instagram', icon: 'fab fa-instagram' },
      { url: myLinks.telegram, title: 'Telegram', class: 'social-link telegram', icon: 'fab fa-telegram-plane' }
    ];
  }
}

import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core';
import { SkillItem } from '../../../../../../models/skill-item'

@Component({
  selector: 'app-skill-card',
  imports: [CommonModule],
  templateUrl: './skill-card.html',
  styleUrl: './skill-card.scss'
})
export class SkillCard {
  skill = input<SkillItem>();
}

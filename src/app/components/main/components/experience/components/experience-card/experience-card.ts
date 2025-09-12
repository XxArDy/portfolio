import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core'
import { ExperienceItem } from '../../../../../../models/experience-item'

@Component({
  selector: 'app-experience-card',
  imports: [TranslateModule, CommonModule],
  templateUrl: './experience-card.html',
  styleUrl: './experience-card.scss'
})
export class ExperienceCard {
  experience = input<ExperienceItem>();
}

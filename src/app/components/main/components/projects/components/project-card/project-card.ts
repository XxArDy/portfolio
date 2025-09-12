import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core'
import { ProjectItem } from '../../../../../../models/project-item'

@Component({
  selector: 'app-project-card',
  imports: [TranslateModule, CommonModule],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss'
})
export class ProjectCard {
  project = input<ProjectItem>();
}

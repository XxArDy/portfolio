import { Component, inject, OnInit } from '@angular/core';
import { FadeInDirective } from '../../../../directives/fade-in.directive'
import { TranslateModule } from '@ngx-translate/core'
import { ProjectItem } from '../../../../models/project-item'
import { DataLoaderService } from '../../../../services/data-loader.service'
import { ProjectCard } from "./components/project-card/project-card";
import { ProjectLastCard } from "./components/project-last-card/project-last-card";

@Component({
  selector: 'app-projects',
  imports: [FadeInDirective, TranslateModule, ProjectCard, ProjectLastCard],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  projects: ProjectItem[] = [];

  private _dataLoader = inject(DataLoaderService);

  async ngOnInit(): Promise<void> {
    this.projects = await this._dataLoader.loadJson<ProjectItem[]>('projects');
  }
}

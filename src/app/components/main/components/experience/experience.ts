import { Component, inject, OnInit } from '@angular/core';
import { FadeInDirective } from '../../../../directives/fade-in.directive'
import { ExperienceCard } from "./components/experience-card/experience-card";
import { ExperienceItem } from '../../../../models/experience-item'
import { DataLoaderService } from '../../../../services/data-loader.service'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-experience',
  imports: [FadeInDirective, ExperienceCard, TranslateModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class Experience implements OnInit {
  experiences: ExperienceItem[] = [];

  private _dataLoader = inject(DataLoaderService);

  async ngOnInit() {
    this.experiences = await this._dataLoader.loadJson("experiences")
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FadeInDirective } from '../../../../directives/fade-in.directive'
import { SkillItem } from '../../../../models/skill-item'
import { TranslateModule } from '@ngx-translate/core'
import { DataLoaderService } from '../../../../services/data-loader.service'
import { SkillCard } from './components/skill-card/skill-card'

@Component({
  selector: 'app-skills',
  imports: [FadeInDirective, SkillCard, TranslateModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills implements OnInit{
  skills: SkillItem[] = []

  private _dataLoader = inject(DataLoaderService);

  async ngOnInit(): Promise<void> {
    this.skills = await this._dataLoader.loadJson<SkillItem[]>('skills');
  }
}

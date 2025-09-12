import { Component } from '@angular/core';
import { FadeInDirective } from '../../../../directives/fade-in.directive'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-about',
  imports: [FadeInDirective, TranslateModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

}

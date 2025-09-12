import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core'
import { SocialLinksComponent } from "../social-links/social-links";

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, SocialLinksComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

}

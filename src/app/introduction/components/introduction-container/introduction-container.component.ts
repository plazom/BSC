import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'bsc-introduction-container',
  templateUrl: './introduction-container.component.html',
  styleUrls: ['./introduction-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroductionContainerComponent {
  constructor(private translateService: TranslateService) {
  }

}

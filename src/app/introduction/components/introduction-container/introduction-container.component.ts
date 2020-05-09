import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'bsc-introduction-container',
  templateUrl: './introduction-container.component.html',
  styleUrls: ['./introduction-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroductionContainerComponent {

  constructor() {
  }

}

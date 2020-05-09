import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'bsc-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersContainerComponent {

  constructor() {
  }

}

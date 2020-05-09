import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'bsc-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesContainerComponent {
  constructor() {
  }

}

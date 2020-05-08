import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export type Flag = Readonly< {
  id: string,
  imgUp: string,
  imgDown: string,
  selected: boolean,
}>;

@Component({
  selector: 'bsc-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlagComponent {
  @Output() onClick = new EventEmitter<string>();
  @Input() flag:Flag = {
    id:'en',
    imgUp:'',
    imgDown:'',
    selected:false
  };

  onUnselectImgClick(){
    this.onClick.emit(this.flag.id);
  }
}

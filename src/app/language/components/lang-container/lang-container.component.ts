import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Flag } from 'src/app/shared/components/flag/flag.component';
@Component({
  selector: 'bsc-lang-container',
  templateUrl: './lang-container.component.html',
  styleUrls: ['./lang-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangContainerComponent {
  @Input() flags: Array<Flag> = [
    {
      id: 'en',
      imgUp: 'assets/imgs/united_kingdom_round_icon_64.png',
      imgDown: 'assets/imgs/united_kingdom_heart_icon_64.png',
      selected: false,
    },
    {
      id: 'cz',
      imgUp: 'assets/imgs/czech_republic_round_icon_64.png',
      imgDown: 'assets/imgs/czech_republic_heart_icon_64.png',
      selected: false,
    },
    {
      id: 'ua',
      imgUp: 'assets/imgs/ukraine_round_icon_64.png',
      imgDown: 'assets/imgs/ukraine_heart_icon_64.png',
      selected: false,
    },
    {
      id: 'ru',
      imgUp: 'assets/imgs/russia_round_icon_64.png',
      imgDown: 'assets/imgs/russia_heart_icon_64.png',
      selected: false,
    },
  ];

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'cz', 'ua', 'ru']);
    this.setLang('cz');
  }

  setLang(id: string) {
    this.translate.use(id);

    this.flags = this.flags.map((flag) => ({
      ...flag,
      selected: flag.id === id,
    }));
  }
}

import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Flag } from '../../../shared/types/flag.type';
import { LanguageEnum } from '../../enums/language.enum';
import { LanguageService } from '../../services/language.service';
@Component({
  selector: 'bsc-lang-container',
  templateUrl: './lang-container.component.html',
  styleUrls: ['./lang-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangContainerComponent implements OnDestroy {
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
  private subscription = new Subscription();

  constructor(private translate: TranslateService, private languageService: LanguageService) {
    translate.addLangs(this.languageService.getLangIds());
    this.subscription.add(
      this.languageService.getLanguage$().subscribe((id:LanguageEnum) => {
        this.translate.use(id);
      })
    );

    this.setLang(LanguageEnum.CZ);
  }

  setLang(id: LanguageEnum) {
    this.languageService.setLanguage(id);

    this.flags = this.flags.map((flag) => ({
      ...flag,
      selected: flag.id === id,
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

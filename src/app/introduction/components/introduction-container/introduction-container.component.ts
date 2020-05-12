import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageEnum } from 'src/app/language/enums/language.enum';
import { LanguageService } from 'src/app/language/services/language.service';
@Component({
  selector: 'bsc-introduction-container',
  templateUrl: './introduction-container.component.html',
  styleUrls: ['./introduction-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroductionContainerComponent implements OnDestroy {
  private subscription = new Subscription();

  constructor(private translate: TranslateService, private languageService: LanguageService) {
    translate.addLangs(this.languageService.getLangIds());
    this.subscription.add(
      this.languageService.getLanguage$().subscribe((id: LanguageEnum) => {
        this.translate.use(id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

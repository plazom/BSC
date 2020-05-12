import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { LangContainerComponent } from './components/lang-container/lang-container.component';
import { LanguageService } from './services/language.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
  ],
  declarations: [
    LangContainerComponent,
  ],
  providers: [
    LanguageService
  ],
  exports: [
    LangContainerComponent,
  ],
})
export class LanguageModule {}

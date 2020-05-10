import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { AuthGuard } from '../guard/auth-guard';
import { LanguageModule } from '../language/language.module';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { coreRoutes } from './core-routes';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/root/', '.json');
}

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes),
    ButtonsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LanguageModule,
  ],
  providers: [
    AuthGuard
  ],
  declarations: [
    MainContainerComponent,
  ],
  exports: [
    MainContainerComponent
  ],
})
export class CoreModule {}

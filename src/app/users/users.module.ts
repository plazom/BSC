import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Route, RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UsersApiService } from '../api/services/users-api.service';
import { SharedModule } from '../shared/shared.module';
import { UsersContainerComponent } from './components/users-container/users-container.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/introduction/', '.json');
}

const usersRoutes: Route[] = [
  {
    path: '',
    component: UsersContainerComponent,
    data: { },
  },
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    RouterModule.forChild(usersRoutes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    UsersContainerComponent,
  ],
  providers:[
    UsersApiService
  ],
  exports: [
  ],
})
export class UsersModule {}

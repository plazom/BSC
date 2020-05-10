import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//import { SweetAlertService } from 'ngx-sweetalert2';
import { FlagComponent } from './components/flag/flag.component';
import { ArraySortPipe } from './components/sortable-table/sort.pipe';
import { SortableTableComponent } from './components/sortable-table/sortable-table.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/root/', '.json');
}

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    //SweetAlertService
  ],
  declarations: [
    FlagComponent,
    SortableTableComponent,
    ArraySortPipe,
  ],
  exports: [
    FlagComponent,
    SortableTableComponent,
    ArraySortPipe
  ],
})
export class SharedModule {
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlagComponent } from './components/flag/flag.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
  ],
  declarations: [
    FlagComponent,
  ],
  exports: [
    FlagComponent,
  ],
})
export class SharedModule {
}

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecimalPlacesDirective } from './directives/decimal-places.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    DecimalPlacesDirective
  ],
  declarations: [
    DecimalPlacesDirective
  ],
  providers: [],
})
export class SharedModule {
}

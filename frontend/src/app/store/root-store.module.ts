import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductStoreModule } from './product/product-store.module';

@NgModule({
  imports: [
    CommonModule,
    ProductStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class RootStoreModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductEffects } from './product.effects';
import { productReducer } from './product.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('product', productReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  exports: [],
  declarations: [],
  providers: [ProductEffects],
})
export class ProductStoreModule {

}

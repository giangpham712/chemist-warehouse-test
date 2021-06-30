import { createSelector } from '@ngrx/store';
import { RootState } from '..';
import { productAdapter, ProductState } from './product.state';

export const selectProductState = (state: RootState) => state.product;

export const selectProducts = productAdapter.getSelectors(selectProductState).selectAll;

export const selectTotalProduct = createSelector(
  selectProductState,
  (state: ProductState) => state.totalProduct
);

export const selectProduct = createSelector(
  selectProductState,
  (state: ProductState) => state.selectedProduct
);

export const selectDeletingProduct = createSelector(
  selectProductState,
  (state: ProductState) => state.isDeletingProduct
);

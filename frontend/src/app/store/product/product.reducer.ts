import { Action, createReducer, on } from '@ngrx/store';
import {
  getProductsSuccess,
  getProductSuccess,
  addProduct,
  addProductSuccess,
  updateProduct,
  updateProductSuccess,
  deleteProduct,
  deleteProductSuccess,
} from './product.actions';
import { initialState, productAdapter, ProductState } from './product.state';

const reducer = createReducer(
  initialState,
  on(getProductsSuccess, (state, { products, totalCount }) => productAdapter.setAll(products, { ...state, totalProduct: totalCount })),
  on(getProductSuccess, (state, { product }) => ({ ...state, selectedProduct: product })),
  on(addProduct, (state) => ({ ...state, isSavingProduct: true})),
  on(addProductSuccess, (state, { product }) => ({ ...state, isSavingProduct: false })),
  on(updateProduct, (state) => ({ ...state, isSavingProduct: true})),
  on(updateProductSuccess, (state, { product }) => ({ ...state, selectedProduct: null, isSavingProduct: false })),
  on(deleteProduct, (state) => ({ ...state, isDeletingProduct: true})),
  on(deleteProductSuccess, (state) => ({ ...state, isDeletingProduct: false })),
);

export function productReducer(state: ProductState | undefined, action: Action): ProductState {
  return reducer(state, action);
}


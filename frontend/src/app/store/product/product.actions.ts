import { Action, createAction, props } from '@ngrx/store';
import {Product} from "../../shared/models/product-models";

export enum ProductActions {
  GetProducts = '[Product] Get Products',
  GetProductsSuccess = '[Product] Get Products Success',
  GetProduct = '[Product] Get Product',
  GetProductSuccess = '[Product] Get Product Success',
  AddProduct = '[Product] Add Product',
  AddProductSuccess = '[Product] Add Product Success',
  UpdateProduct = '[Product] Update Product',
  UpdateProductSuccess = '[Product] Update Product Success',
  DeleteProduct = '[Product] Delete Product',
  DeleteProductSuccess = '[Product] Delete Product Success',
}

export const getProducts = createAction(
  ProductActions.GetProducts,
  props<{ startIndex?: number, pageSize?: number, sortBy: string, sortDir: string }>()
);

export const getProductsSuccess = createAction(
  ProductActions.GetProductsSuccess,
  props<{ products: Product[], totalCount: number }>()
);

export const getProduct = createAction(
  ProductActions.GetProduct,
  props<{ id: string }>()
);

export const getProductSuccess = createAction(
  ProductActions.GetProductSuccess,
  props<{ product: Product }>()
);

export const addProduct = createAction(
  ProductActions.AddProduct,
  props<{ product: Product }>()
);

export const addProductSuccess = createAction(
  ProductActions.AddProductSuccess,
  props<{ product: Product }>()
);

export const updateProduct = createAction(
  ProductActions.UpdateProduct,
  props<{ id: number, product: Product }>()
);

export const updateProductSuccess = createAction(
  ProductActions.UpdateProductSuccess,
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  ProductActions.DeleteProduct,
  props<{ id: number }>()
);

export const deleteProductSuccess = createAction(
  ProductActions.DeleteProductSuccess
);

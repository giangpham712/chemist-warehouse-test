import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import {
  addProduct,
  addProductSuccess, deleteProduct, deleteProductSuccess,
  getProduct,
  getProducts,
  getProductsSuccess,
  getProductSuccess, updateProduct, updateProductSuccess
} from './product.actions';
import { ProductApiService } from "../../core/services/api/product-api.service";
import { NotificationService } from '../../core/services/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private productApiService: ProductApiService,
    private notificationService: NotificationService
  ) { }

  getProductsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(getProducts),
    mergeMap(action => this.productApiService.getList(action.startIndex, action.pageSize, action.sortBy, action.sortDir)
      .pipe(
        map(pagedResult => getProductsSuccess({ products: pagedResult.items, totalCount: pagedResult.totalCount })),
        catchError(() => of({ type: '' }))
      )
    )
  ));

  getProductEffect$ = createEffect(() => this.actions$.pipe(
    ofType(getProduct),
    mergeMap(action => this.productApiService.get(action.id)
      .pipe(
        map(product => getProductSuccess({ product: product })),
        catchError(() => of({ type: '' }))
      )
    )
  ));

  addProductEffects = createEffect(() => this.actions$.pipe(
    ofType(addProduct),
    mergeMap(action => this.productApiService.add(action.product)
      .pipe(
        map(product => addProductSuccess({ product: product })),
        tap(() => {
          this.notificationService.notifySuccess('Product created successfully');
          this.router.navigate(['/product']);
        }),
        catchError(() => of({ type: '' }))
      )
    )
  ));

  updateProductEffects = createEffect(() => this.actions$.pipe(
    ofType(updateProduct),
    mergeMap(action => this.productApiService.update(action.id, action.product)
      .pipe(
        map(product => updateProductSuccess({ product: product })),
        tap(() => {
          this.notificationService.notifySuccess('Product updated successfully');
          this.router.navigate(['/product']);
        }),
        catchError(() => of({ type: '' }))
      )
    )
  ));

  deleteProductEffects = createEffect(() => this.actions$.pipe(
    ofType(deleteProduct),
    mergeMap(action => this.productApiService.delete(action.id)
      .pipe(
        map(product => deleteProductSuccess()),
        tap(() => { this.notificationService.notifySuccess('Product deleted successfully') }),
        catchError(() => of({ type: '' }))
      )
    )
  ));
}

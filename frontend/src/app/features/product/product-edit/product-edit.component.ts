import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Product } from '../../../shared/models/product-models';
import { selectProduct } from '../../../store/product/product.selectors';
import { ActivatedRoute } from '@angular/router';
import { RootState } from '../../../store';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { addProduct, getProduct, updateProduct } from '../../../store/product/product.actions';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  pageType: string;
  product: Product;
  form: FormGroup;

  productTypes = ['Books', 'Electronics', 'Food', 'Furniture', 'Toys'];

  public destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private store: Store<RootState>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.pageType = 'edit';
      this.store.pipe(select(selectProduct))
        .pipe(
          takeUntil(this.destroy$),
        ).subscribe(product => {
          this.product = product;
          this.form = this.createProductForm(product);
        });

      this.store.dispatch(getProduct({ id: productId }));
    } else {
      this.pageType = 'new';
      this.form = this.createProductForm();
    }
  }

  get productName() {
    return this.product ? this.product.name : '';
  }

  createProductForm(product?: Product): FormGroup {
    return this.formBuilder.group({
      name: [product ? product.name : null, [Validators.required, Validators.maxLength(100)]],
      price: [product ? product.price : null, Validators.required],
      type: [product ? product.type : this.productTypes[0], Validators.required],
      active: [product ? product.active : false, Validators.required],
    });
  }

  saveProduct() {
    if (this.form.invalid) {
      return;
    }

    const productData = this.form.value;
    if (this.pageType === 'new') {
      this.store.dispatch(addProduct({ product: productData }))
    } else {
      this.store.dispatch(updateProduct({ id: this.product.id, product: productData }))
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

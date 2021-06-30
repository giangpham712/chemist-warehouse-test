import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "../../../shared/models/product-models";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { combineLatest, Observable, Subject } from 'rxjs';
import { selectProducts, selectTotalProduct } from '../../../store/product/product.selectors';
import { getProducts, RootState } from '../../../store';
import { select, Store } from '@ngrx/store';
import { defaultIfEmpty, distinctUntilChanged, startWith, takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PopupService } from '../../../core/services/popup.service';
import { deleteProduct } from '../../../store/product/product.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  displayedColumns = ['name', 'price', 'type', 'active', 'actions'];
  dataSource: MatTableDataSource<Product>;

  destroy$ = new Subject();
  reloadProduct$ = new Subject();
  $totalProduct: Observable<number>;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  constructor(
    private router: Router,
    private store: Store<RootState>,
    private popupService: PopupService,
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(selectProducts))
      .pipe(
        takeUntil(this.destroy$),
        tap(products => this.initializeDataTable(products)))
      .subscribe();

    this.$totalProduct = this.store.pipe(select(selectTotalProduct));

    this.initLoadProducts();
  }

  get displayedFooterColumns() {
    return (!this.dataSource || this.dataSource.data.length === 0) ? ['noProducts'] : []
  }

  initLoadProducts(): void {
    combineLatest([
      this.reloadProduct$.pipe(startWith({})),
      this.paginator.page.pipe(startWith({ pageIndex: 0, pageSize: 5 })),
      this.sort.sortChange.pipe(startWith({ active: 'name', direction: 'asc' }))])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe(([reload, page, sort]) => {
        this.store.dispatch(getProducts({ startIndex: page.pageIndex * page.pageSize, pageSize: page.pageSize, sortBy: sort.active, sortDir: sort.direction }));
      });
  }

  editProduct(product: Product) {
    this.router.navigate(['/product', product.id]);
  }

  deleteProduct(product: Product) {
    this.popupService.confirm('Delete product?', 'Are you sure you want to delete this product?')
      .subscribe((confirmed) => {
        this.store.dispatch(deleteProduct({ id: product.id }));
      });
  }

  private initializeDataTable(products: Product[]): void {
    console.log(products);
    this.dataSource = new MatTableDataSource(products);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

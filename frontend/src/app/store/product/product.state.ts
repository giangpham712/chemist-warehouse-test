import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from "../../shared/models/product-models";


export interface ProductState extends EntityState<Product> {
  products: Product[];
  totalProduct: number;
  selectedProduct: Product;
  isSavingProduct: boolean;
  isDeletingProduct: boolean;
}

export const productAdapter: EntityAdapter<
  Product
  > = createEntityAdapter<Product>({
  selectId: model => model.id
});

export const initialState: ProductState = productAdapter.getInitialState(
  {
    products: [],
    totalProduct: 0,
    selectedProduct: null,
    isSavingProduct: false,
    isDeletingProduct: false
  }
);

import { Product } from '../../product/models/product.model';

export interface BestSeller {
  product: Product;
  totalQuantity: number;
}

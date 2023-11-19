import { Category } from '../../category/models/category.model';

export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  category: Category;
}

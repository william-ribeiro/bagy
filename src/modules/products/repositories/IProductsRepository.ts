import { Product } from '../entities/Product';
import { ProductInput } from '../graphql/ProductInput';

export interface IProductsRepository {
  findAll(): Promise<Product[] | undefined>;
  findById(id: number): Promise<Product | undefined>;
  findByProduct(name: string): Promise<Product | undefined>;
  create(data: ProductInput): Promise<Product>;
  update(data: ProductInput): Promise<Product>;
  delete(id: number): Promise<boolean>;
}

import { ProductInput } from '../graphql/ProductInput';

export interface IProductDTO extends ProductInput {
  id?: number;
  created_at?: string;
  updated_at?: string;
}

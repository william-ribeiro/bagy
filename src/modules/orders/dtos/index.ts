import { Product } from '../../products/entities/Product';

export interface IOrderDTO {
  id?: number;
  costumer_id?: number;
  products: Product[];
  installments: number;
  total?: number;
  status?: 'request' | 'in_progress' | 'recused' | 'delivered' | 'cancelled';
}

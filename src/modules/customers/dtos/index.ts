import { Order } from '../../orders/entities/Order';
import { CustomerInput } from '../graphql/CustomerInput';

export interface ICustomerDTO extends CustomerInput {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  orders?: Order[];
  customer_id?: number;
}

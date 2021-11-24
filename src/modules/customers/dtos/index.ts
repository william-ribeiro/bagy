import { CustomerInput } from '../graphql/CustomerInput';

export interface ICustomerDTO extends CustomerInput {
  id?: number;
  created_at?: string;
  updated_at?: string;
}

import { OrderInput } from '../graphql/Inputs';

export interface IOrderDTO extends OrderInput {
  id?: number;

  created_at?: string;
  updated_at?: string;
}

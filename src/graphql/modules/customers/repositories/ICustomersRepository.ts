import { Customer } from '../entities/Customer';
import { CustomerInput } from '../schemas/CustomerInput';

export interface ICustomersRepository {
  findAll(): Promise<Customer[]>;
  findById(id: Number): Promise<Customer | null>;
  create(data: CustomerInput): Promise<Customer>;
}

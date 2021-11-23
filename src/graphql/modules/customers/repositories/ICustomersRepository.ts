import { Customer } from '../entities/Customer';
import { CustomerInput } from '../schemas/CustomerInput';

export interface ICustomersRepository {
  findAll(): Promise<Customer[] | undefined>;
  findById(id: Number): Promise<Customer | undefined>;
  create(data: CustomerInput): Promise<Customer>;
}

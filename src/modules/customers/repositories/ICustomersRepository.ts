import { Customer } from '../entities/Customer';
import { CustomerInput } from '../graphql/CustomerInput';

export interface ICustomersRepository {
  findAll(): Promise<Customer[] | undefined>;
  findById(id: number): Promise<Customer | undefined>;
  findByCustomer(email: string): Promise<Customer | undefined>;
  findByCpf(cpf: string): Promise<Customer | undefined>;
  create(data: CustomerInput): Promise<Customer>;
  update(data: CustomerInput): Promise<Customer>;
  delete(id: number): Promise<boolean>;
}

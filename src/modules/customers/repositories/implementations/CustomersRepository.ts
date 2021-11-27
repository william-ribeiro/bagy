import { EntityRepository, getRepository, Repository } from 'typeorm';

import { ICustomerDTO } from '../../dtos';
import { Customer } from '../../entities/Customer';
import { ICustomersRepository } from '../ICustomersRepository';

@EntityRepository(Customer)
export class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = getRepository(Customer);
  }

  public async findAll(): Promise<Customer[] | undefined> {
    return this.repository.find();
  }

  public async findByCustomer(email: string): Promise<Customer | undefined> {
    return this.repository.findOne({ email });
  }

  public async findByCpf(cpf: string): Promise<Customer | undefined> {
    return this.repository.findOne({ cpf });
  }

  public async findById(id: number): Promise<Customer | undefined> {
    return this.repository.findOne({ id });
  }

  public async update(customer: ICustomerDTO): Promise<Customer> {
    await this.repository.update(customer.id, customer);

    return this.repository.save(customer);
  }

  public async create(data: ICustomerDTO): Promise<Customer> {
    const createCustomer = this.repository.create(data);
    await this.repository.save(createCustomer);
    return createCustomer;
  }

  public async delete(id: number): Promise<boolean> {
    return !!(await this.repository.delete({ id }));
  }
}

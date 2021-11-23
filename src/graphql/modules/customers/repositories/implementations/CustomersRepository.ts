import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Customer } from '../../entities/Customer';
import { CustomerInput } from '../../schemas/CustomerInput';
import { ICustomersRepository } from '../ICustomersRepository';

@EntityRepository(Customer)
class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = getRepository(Customer);
  }

  async findAll(): Promise<Customer[] | undefined> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Customer | null> {
    return await this.repository.findOne(id);
  }

  async create(data: CustomerInput): Promise<Customer> {
    const createCustomer = Customer.create(data);

    return await createCustomer.save();
  }
}
export { CustomersRepository };

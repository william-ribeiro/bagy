import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Customer } from '../entities/Customer';
import { CustomerInput } from './CustomerInput';
import { CustomersRepository } from '../repositories/implementations/CustomersRepository';

@Resolver()
export class CustomerResolvers {
  private customersRepository: CustomersRepository = new CustomersRepository();

  @Query(() => [Customer])
  async allCustomers(): Promise<Customer[]> {
    return await Customer.find();
  }

  @Query(() => Customer, { nullable: true })
  custumer(@Arg('customerId') customerId: number) {
    return this.customersRepository.findById(customerId);
  }

  @Mutation(() => Customer)
  async createCustomers(@Arg('customerInput') customerInput: CustomerInput): Promise<Customer> {
    const customer = await this.customersRepository.create(customerInput);
    return customer;
  }
}

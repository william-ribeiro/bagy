import { container } from 'tsyringe';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Customer } from '../entities/Customer';
import { CustomerInput } from './CustomerInput';
import { CustomersRepository } from '../repositories/implementations/CustomersRepository';
import { CreateCustomerUseCase } from '../useCases/CreateCustomerUseCase';
import { UpdateCustomerUseCase } from '../useCases/UpdateCustomerUseCase';
import { DeleteCustomerUseCase } from '../useCases/DeleteCustomerUseCase';

@Resolver(Customer)
export class CustomerResolvers {
  private customersRepository: CustomersRepository = new CustomersRepository();

  @Query(() => [Customer])
  async allCustomers(): Promise<Customer[]> {
    return this.customersRepository.findAll();
  }

  @Query(() => Customer, { nullable: true })
  async custumer(@Arg('customerId') customerId: number) {
    return this.customersRepository.findById(customerId);
  }

  @Mutation(() => Customer, { nullable: true })
  async createCustomer(@Arg('customerInput') customerInput: CustomerInput): Promise<Customer> {
    const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

    const customer = await createCustomerUseCase.execute(customerInput);

    return customer;
  }

  @Mutation(() => Customer, { nullable: true })
  async updateCustomer(
    @Arg('customerInput') customerInput: CustomerInput,
    @Arg('id') id: number,
  ): Promise<Customer> {
    const updateCustomerUseCase = container.resolve(UpdateCustomerUseCase);

    const customer = await updateCustomerUseCase.execute({ id, ...customerInput });

    return customer;
  }

  @Mutation(() => Boolean)
  async deleteCustomer(@Arg('id') id: number): Promise<boolean> {
    const deleteCustomerUseCase = container.resolve(DeleteCustomerUseCase);

    return !!(await deleteCustomerUseCase.execute(id));
  }
}

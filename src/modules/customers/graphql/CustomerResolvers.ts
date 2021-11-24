import { container } from 'tsyringe';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Customer } from '../entities/Customer';
import { CustomerInput } from './CustomerInput';
import { CustomersRepository } from '../repositories/implementations/CustomersRepository';
import { CreateUserUseCase } from '../useCases/CreateCustomerUseCase';
import { UpdateUserUseCase } from '../useCases/UpdateCustomerUseCase';
import { DeleteUserUseCase } from '../useCases/DeleteCustomerUseCase';

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
  async createCustomers(@Arg('customerInput') customerInput: CustomerInput): Promise<Customer> {
    const createCustomerUseCase = container.resolve(CreateUserUseCase);

    const customer = await createCustomerUseCase.execute(customerInput);

    return customer;
  }

  @Mutation(() => Customer, { nullable: true })
  async updateCustomer(
    @Arg('customerInput') customerInput: CustomerInput,
    @Arg('id') id: number,
  ): Promise<Customer> {
    const updateCustomerUseCase = container.resolve(UpdateUserUseCase);

    const customer = await updateCustomerUseCase.execute({ id, ...customerInput });

    return customer;
  }

  @Mutation(() => Boolean)
  async deleteCustomer(@Arg('id') id: number): Promise<boolean> {
    const deleteCustomerUseCase = container.resolve(DeleteUserUseCase);

    return !!(await deleteCustomerUseCase.execute(id));
  }
}

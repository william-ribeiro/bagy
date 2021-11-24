import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../errors/AppError';
import { ICustomerDTO } from '../dtos';
import { Customer } from '../entities/Customer';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(data: ICustomerDTO): Promise<Customer> {
    const findCustomer = await this.customersRepository.findByCustomer(data.email);

    if (findCustomer) {
      throw new AppError('Customer already exists', 409);
    }
    const customer = await this.customersRepository.create(data);
    return customer;
  }
}

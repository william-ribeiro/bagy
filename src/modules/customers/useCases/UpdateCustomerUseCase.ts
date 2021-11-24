import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../errors/AppError';
import { ICustomerDTO } from '../dtos';
import { Customer } from '../entities/Customer';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

@injectable()
export class UpdateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(data: ICustomerDTO): Promise<Customer> {
    const findCustomer = await this.customersRepository.findById(data.id);

    if (!findCustomer) {
      throw new AppError('Customer not found!', 404);
    }
    const customer = await this.customersRepository.update(data);
    return customer;
  }
}

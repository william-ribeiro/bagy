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

    const findEmail = await this.customersRepository.findByCustomer(data.email);
    const findCpf = await this.customersRepository.findByCpf(data.cpf);

    if (
      (findEmail && findEmail.email !== findCustomer.email) ||
      (findCpf && findCpf.cpf !== findCustomer.cpf)
    ) {
      throw new AppError('Customer already exists!', 409);
    }

    const customer = await this.customersRepository.update(data);
    return customer;
  }
}

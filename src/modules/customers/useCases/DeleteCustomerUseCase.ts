import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../errors/AppError';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

@injectable()
export class DeleteCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(id: number): Promise<boolean> {
    const findCustomer = await this.customersRepository.findById(id);

    if (!findCustomer) {
      throw new AppError('Customer not found!', 404);
    }
    return !!(await this.customersRepository.delete(id));
  }
}

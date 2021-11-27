import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { IOrdersRepository } from '../../orders/repositories/IOrdersRepository';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

@injectable()
export class DeleteCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(id: number): Promise<boolean> {
    const findCustomer = await this.customersRepository.findById(id);

    if (!findCustomer) {
      throw new AppError('Customer not found!', 404);
    }

    const findOrder = await this.ordersRepository.findByCustomer(findCustomer.id);
    if (findOrder) {
      throw new AppError('The customer has orders and cannot be deleted');
    }
    return !!(await this.customersRepository.delete(id));
  }
}

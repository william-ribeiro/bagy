import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { IOrdersProductsRepository } from '../repositories/IOrdersProductsRepository';
import { IOrdersRepository } from '../repositories/IOrdersRepository';

@injectable()
export class DeleteOrderUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,
  ) {}

  public async execute(id: number): Promise<boolean> {
    const findOrder = await this.ordersRepository.findById(id);

    if (!findOrder) {
      throw new AppError('Order not found!', 404);
    }

    if (findOrder.status === 'delivered') {
      throw new AppError('The order has already been delivered and cannot be deleted.');
    }

    const order_id = findOrder.orders_products.filter((o) => o.order_id);

    if (order_id) {
      for (const i of order_id) {
        await this.ordersProductsRepository.delete(i.id);
      }
    }

    return !!(await this.ordersRepository.delete(id));
  }
}

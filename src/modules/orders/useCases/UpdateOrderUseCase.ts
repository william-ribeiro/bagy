import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../errors/AppError';
import { Order } from '../entities/Order';
import { IOrderDTO } from '../dtos';
import { IOrdersRepository } from '../repositories/IOrdersRepository';

@injectable()
export class UpdateOrderUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(data: IOrderDTO): Promise<Order> {
    const findOrder = await this.ordersRepository.findById(data.id);

    if (!findOrder) {
      throw new AppError('Order not found!', 404);
    }
    const order = await this.ordersRepository.update(data);
    return order;
  }
}

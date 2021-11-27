import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { UpdateOrderInput } from '../graphql/Inputs';
import { IOrdersRepository } from '../repositories/IOrdersRepository';

@injectable()
export class UpdateOrderUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(data: UpdateOrderInput): Promise<UpdateOrderInput> {
    const findOrder = await this.ordersRepository.findById(data.order_id);

    if (!findOrder) {
      throw new AppError('Order not found!', 404);
    }
    findOrder.status = data.status;
    const order = await this.ordersRepository.update(findOrder);
    return order;
  }
}

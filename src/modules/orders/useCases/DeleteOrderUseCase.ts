import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../errors/AppError';
import { IOrdersRepository } from '../repositories/IOrdersRepository';

@injectable()
export class DeleteOrderUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(id: number): Promise<boolean> {
    const findOrder = await this.ordersRepository.findById(id);

    if (!findOrder) {
      throw new AppError('Order not found!', 404);
    }
    return !!(await this.ordersRepository.delete(id));
  }
}

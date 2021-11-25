import { inject, injectable } from 'tsyringe';
import { IOrderDTO } from '../dtos';
import { Order } from '../entities/Order';
import { IOrdersRepository } from '../repositories/IOrdersRepository';

@injectable()
export class CreateOrdertUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(data: IOrderDTO): Promise<Order> {
    const product = await this.ordersRepository.create(data);
    return product;
  }
}

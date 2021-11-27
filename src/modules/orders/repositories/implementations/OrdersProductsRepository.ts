import { EntityRepository, getRepository, Repository } from 'typeorm';

import { IOrderProductDTO } from '../../dtos';
import { OrderProduct } from '../../entities/OrderProduct';
import { IOrdersProductsRepository } from '../IOrdersProductsRepository';

@EntityRepository(OrderProduct)
export class OrdersProductsRepository implements IOrdersProductsRepository {
  private repository: Repository<OrderProduct>;

  constructor() {
    this.repository = getRepository(OrderProduct);
  }

  public async findByOrdersProducts(order_id: number): Promise<OrderProduct[] | undefined> {
    return this.repository.find({ where: { order_id } });
  }

  public async create(data: IOrderProductDTO): Promise<OrderProduct> {
    const createOrderProduct = this.repository.create(data);
    await this.repository.save(createOrderProduct);
    return createOrderProduct;
  }

  public async delete(id: number): Promise<boolean> {
    return !!(await this.repository.delete(id));
  }
}

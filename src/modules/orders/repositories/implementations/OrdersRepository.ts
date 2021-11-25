import { EntityRepository, getRepository, Repository } from 'typeorm';

import { IOrderDTO } from '../../dtos';
import { Order } from '../../entities/Order';
import { IOrdersRepository } from '../IOrdersRepository';

@EntityRepository(Order)
export class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  public async findAll(): Promise<Order[] | undefined> {
    return this.repository.find();
  }

  public async findById(id: number): Promise<Order | undefined> {
    return this.repository.findOne({ id });
  }

  public async update(order: IOrderDTO): Promise<Order> {
    return this.repository.save(order);
  }

  public async create(data: IOrderDTO): Promise<Order> {
    const createOrder = this.repository.create(data);
    await this.repository.save(createOrder);
    return createOrder;
  }

  public async delete(id: number): Promise<boolean> {
    return !!(await this.repository.delete(id));
  }
}

import { EntityRepository, getRepository, Repository } from 'typeorm';

import { Order } from '../../entities/Order';
import { UpdateOrderInput } from '../../graphql/Inputs';
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
    return this.repository.findOne(id);
  }

  public async update(order: UpdateOrderInput): Promise<UpdateOrderInput> {
    return this.repository.save(order);
  }

  public async create(data: UpdateOrderInput): Promise<Order> {
    const createOrder = this.repository.create(data);
    await this.repository.save(createOrder);
    return createOrder;
  }

  public async delete(id: number): Promise<boolean> {
    return !!(await this.repository.delete(id));
  }
}

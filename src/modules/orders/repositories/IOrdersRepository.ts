import { Order } from '../entities/Order';
import { OrderInput, UpdateOrderInput } from '../graphql/Inputs';

export interface IOrdersRepository {
  findAll(): Promise<Order[] | undefined>;
  findById(id: number): Promise<Order | undefined>;

  create(data: OrderInput): Promise<Order>;
  update(data: UpdateOrderInput): Promise<UpdateOrderInput>;
  delete(id: number): Promise<boolean>;
}

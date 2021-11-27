import { IOrderDTO } from '../dtos';
import { Order } from '../entities/Order';
import { UpdateOrderInput } from '../graphql/Inputs';

export interface IOrdersRepository {
  findAll(): Promise<Order[] | undefined>;
  findById(id: number): Promise<Order | undefined>;
  findByCustomer(customer_id: number): Promise<Order | undefined>;

  create(data: IOrderDTO): Promise<Order>;
  update(data: UpdateOrderInput): Promise<UpdateOrderInput>;
  delete(id: number): Promise<boolean>;
}

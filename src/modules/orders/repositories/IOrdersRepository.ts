import { IOrderDTO } from '../dtos';
import { Order } from '../entities/Order';

export interface IOrdersRepository {
  findAll(): Promise<Order[] | undefined>;
  findById(id: number): Promise<Order | undefined>;

  create(data: IOrderDTO): Promise<Order>;
  update(data: IOrderDTO): Promise<Order>;
  delete(id: number): Promise<boolean>;
}

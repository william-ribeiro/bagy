import { IOrderProductDTO } from '../dtos';
import { OrderProduct } from '../entities/OrderProduct';

export interface IOrdersProductsRepository {
  findByOrdersProducts(order_id: number): Promise<OrderProduct[] | undefined>;

  create(data: IOrderProductDTO): Promise<OrderProduct>;
  delete(id: number): Promise<boolean>;
}

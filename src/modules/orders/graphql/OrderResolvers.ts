import { container } from 'tsyringe';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Order } from '../entities/Order';
import { OrderInput, UpdateOrderInput } from './Inputs';
import { OrdersRepository } from '../repositories/implementations/OrdersRepository';
import { CreateOrdertUseCase } from '../useCases/CreateOrderUseCase';
import { UpdateOrderUseCase } from '../useCases/UpdateOrderUseCase';
import { DeleteOrderUseCase } from '../useCases/DeleteOrderUseCase';

@Resolver(Order)
export class OrderResolvers {
  private ordersRepository: OrdersRepository = new OrdersRepository();

  @Query(() => [Order])
  async allOrders(): Promise<Order[]> {
    return await this.ordersRepository.findAll();
  }

  @Query(() => Order, { nullable: true })
  async order(id: number) {
    return this.ordersRepository.findById(id);
  }

  @Mutation(() => Order, { nullable: true })
  async creatOrder(@Arg('orders') orders: OrderInput): Promise<Order> {
    const createOrdertUseCase = container.resolve(CreateOrdertUseCase);

    const order = await createOrdertUseCase.execute(orders);

    return order;
  }

  @Mutation(() => Order, { nullable: true })
  async updateOrder(@Arg('update') orderInput: UpdateOrderInput): Promise<UpdateOrderInput> {
    const updateOrderUseCase = container.resolve(UpdateOrderUseCase);

    const order = await updateOrderUseCase.execute(orderInput);

    return order;
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Arg('id') id: number): Promise<boolean> {
    const deleteOrderUseCase = container.resolve(DeleteOrderUseCase);

    return !!(await deleteOrderUseCase.execute(id));
  }
}

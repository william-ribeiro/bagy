import { container } from 'tsyringe';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Order } from '../entities/Order';
import { OrderInput } from './Inputs';
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
  async order(@Arg('orderId') orderId: number) {
    return this.ordersRepository.findById(orderId);
  }

  @Mutation(() => Order, { nullable: true })
  async creatOrder(@Arg('orderInput') orderInput: OrderInput): Promise<Order> {
    const createOrdertUseCase = container.resolve(CreateOrdertUseCase);

    const order = await createOrdertUseCase.execute(orderInput);
    return order;
  }

  @Mutation(() => Order, { nullable: true })
  async updateOrder(
    @Arg('orderInput') orderInput: OrderInput,
    @Arg('id') id: number,
  ): Promise<Order> {
    const updateOrderUseCase = container.resolve(UpdateOrderUseCase);

    const order = await updateOrderUseCase.execute({ id, ...orderInput });

    return order;
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Arg('id') id: number): Promise<boolean> {
    const deleteOrderUseCase = container.resolve(DeleteOrderUseCase);

    return !!(await deleteOrderUseCase.execute(id));
  }
}

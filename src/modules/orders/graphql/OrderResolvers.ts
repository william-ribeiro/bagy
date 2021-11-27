import { container } from 'tsyringe';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { Order } from '../entities/Order';
import { ICustomerDTO } from '../../customers/dtos';
import { OrderInput, UpdateOrderInput } from './Inputs';

import { CreateOrdertUseCase } from '../useCases/CreateOrderUseCase';
import { UpdateOrderUseCase } from '../useCases/UpdateOrderUseCase';
import { DeleteOrderUseCase } from '../useCases/DeleteOrderUseCase';

import { OrdersRepository } from '../repositories/implementations/OrdersRepository';
import { CustomersRepository } from '../../customers/repositories/implementations/CustomersRepository';
import { OrdersProductsRepository } from '../repositories/implementations/OrdersProductsRepository';

import { SendEmail } from '../../../shared/sentEmail';

@Resolver(Order)
export class OrderResolvers {
  private ordersRepository: OrdersRepository = new OrdersRepository();
  private customersRepository: CustomersRepository = new CustomersRepository();
  private ordersProductsRepository: OrdersProductsRepository = new OrdersProductsRepository();

  @Query(() => [Order])
  async allOrders(): Promise<Order[]> {
    return await this.ordersRepository.findAll();
  }

  @Query(() => Order, { nullable: true })
  async order(@Arg('orderId') orderId: number) {
    return this.ordersRepository.findById(orderId);
  }

  @Mutation(() => Order, { nullable: true })
  async creatOrder(@Arg('orders') orders: OrderInput): Promise<Order> {
    const createOrdertUseCase = container.resolve(CreateOrdertUseCase);

    let order = await createOrdertUseCase.execute(orders);

    const customer: ICustomerDTO = await this.customersRepository.findById(order.customer_id);
    const orders_products = await this.ordersProductsRepository.findByOrdersProducts(order.id);

    order = { ...order, customer, orders_products };

    const send = new SendEmail();
    send.Email({
      order_id: order.id,
      name: customer.name,
      email: customer.email,
      total: order.total,
      orders_products,
    });

    return order;
  }

  @Mutation(() => Order, { nullable: true })
  async updateOrder(@Arg('orderInput') orderInput: UpdateOrderInput): Promise<UpdateOrderInput> {
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

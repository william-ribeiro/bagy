import { inject, injectable } from 'tsyringe';
import { sendmail } from '../../../config/sendmail';
import { AppError } from '../../../errors/AppError';

import { Order } from '../entities/Order';
import { OrderInput } from '../graphql/Inputs';

import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { IOrdersRepository } from '../repositories/IOrdersRepository';

import { checkCustomer } from '../../../shared/utils/checkCustomer';
import { checkStock } from '../../../shared/utils/checkStock';

interface IStock {
  product_id: number;
  quantity: number;
}

export interface IRequest {
  customer_id: number;
  installments: number;
  products: IStock[];
}

@injectable()
export class CreateOrdertUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(data: OrderInput): Promise<Order> {
    const { customer_id, installments, products } = data;

    const getCustomer = await checkCustomer(customer_id);

    if (!getCustomer) {
      throw new AppError('Customer does not exits!');
    }

    const order = [];
    const getProducts = await this.productsRepository.findAll();

    for (const p of products) {
      const orderProduct = checkStock(getProducts, {
        product_id: p.product_id,
        quantity: p.quantity,
      });

      if (!orderProduct) {
        return;
      }
      const { price } = orderProduct;

      order.push({ products: orderProduct, total: price * p.quantity });
    }

    let valorTotal = 0;

    let removeStock = products[0].quantity;
    for (const { products, total } of Object.values(order)) {
      const currentStock = await this.productsRepository.findById(products.id);
      products.stock = currentStock.stock - removeStock;
      await this.productsRepository.update(products);
      valorTotal += total;
    }

    // const makeOrder = {
    //   customer_id,
    //   installments,
    //   total: valorTotal,
    //   status: 'delivered',
    // };

    const makeOrder = await this.ordersRepository.create({
      customer_id,
      products,
      installments,
      total: valorTotal,
      status: 'delivered',
      customer: getCustomer,
    });
    const response = { ...makeOrder, products, total_installments: valorTotal / installments };

    sendmail();
    console.warn('response', response);
    console.warn('makeOrder', makeOrder);
    console.warn('data', data);

    return response;
  }
}

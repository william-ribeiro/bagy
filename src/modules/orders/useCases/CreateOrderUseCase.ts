import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';

import { Order } from '../entities/Order';
import { Product } from '../../products/entities/Product';

import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { IOrdersRepository } from '../repositories/IOrdersRepository';
import { IOrdersProductsRepository } from '../repositories/IOrdersProductsRepository';

import { checkCustomer } from '../../../shared/utils/checkCustomer';
import { checkStock } from '../../../shared/utils/checkStock';

import { IOrderDTO } from '../dtos';

interface IOrder {
  order_id?: number;
  product_id?: number;
  updateStock?: Product;
  quantity?: number;
  total?: number;
}

@injectable()
export class CreateOrdertUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,
  ) {}

  public async execute(data: IOrderDTO): Promise<Order> {
    try {
      const { customer_id, installments, products } = data;

      await checkCustomer(customer_id);

      const getProducts = await this.productsRepository.findAll();

      const order: IOrder[] = [];
      for (const { product_id, quantity } of products) {
        const verifyProduct = checkStock(getProducts, {
          product_id,
          quantity,
        });

        const removeStock = verifyProduct.stock - quantity;
        verifyProduct.stock = removeStock;

        order.push({
          updateStock: verifyProduct,
          quantity,
          total: verifyProduct.price * quantity,
        });
      }

      let valorTotal = 0;
      for (const o of Object.values(order)) {
        valorTotal += o.total;
        await this.productsRepository.update(o.updateStock);
      }

      const makeOrder = await this.ordersRepository.create({
        customer_id,
        installments,
        total: valorTotal,
        status: 'request',
      });

      for (const p of products) {
        await this.ordersProductsRepository.create({
          order_id: makeOrder.id,
          product_id: p.product_id,
          quantity: p.quantity,
        });
      }

      return makeOrder;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

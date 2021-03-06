import { container } from 'tsyringe';

import { ICustomersRepository } from '../../modules/customers/repositories/ICustomersRepository';
import { CustomersRepository } from '../../modules/customers/repositories/implementations/CustomersRepository';

import { ProductsRepository } from '../../modules/products/repositories/implementations/ProductsRepository';
import { IProductsRepository } from '../../modules/products/repositories/IProductsRepository';

import { OrdersRepository } from '../../modules/orders/repositories/implementations/OrdersRepository';
import { IOrdersRepository } from '../../modules/orders/repositories/IOrdersRepository';

import { OrdersProductsRepository } from '../../modules/orders/repositories/implementations/OrdersProductsRepository';
import { IOrdersProductsRepository } from '../../modules/orders/repositories/IOrdersProductsRepository';

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);
container.registerSingleton<IProductsRepository>('ProductsRepository', ProductsRepository);
container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository);
container.registerSingleton<IOrdersProductsRepository>(
  'OrdersProductsRepository',
  OrdersProductsRepository,
);

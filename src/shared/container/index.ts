import { container } from 'tsyringe';

import { ICustomersRepository } from '../../modules/customers/repositories/ICustomersRepository';
import { CustomersRepository } from '../../modules/customers/repositories/implementations/CustomersRepository';

import { OrdersRepository } from '../../modules/orders/repositories/implementations/OrdersRepository';
import { IOrdersRepository } from '../../modules/orders/repositories/IOrdersRepository';

import { ProductsRepository } from '../../modules/products/repositories/implementations/ProductsRepository';
import { IProductsRepository } from '../../modules/products/repositories/IProductsRepository';

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);
container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository);
container.registerSingleton<IProductsRepository>('ProductsRepository', ProductsRepository);

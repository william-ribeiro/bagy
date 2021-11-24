import { container } from 'tsyringe';

import { ICustomersRepository } from '../../modules/customers/repositories/ICustomersRepository';
import { CustomersRepository } from '../../modules/customers/repositories/implementations/CustomersRepository';

import { ProductsRepository } from '../../modules/products/repositories/implementations/ProductsRepository';
import { IProductsRepository } from '../../modules/products/repositories/IProductsRepository';

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);
container.registerSingleton<IProductsRepository>('ProductsRepository', ProductsRepository);

import { container } from 'tsyringe';
import { ICustomersRepository } from '../../modules/customers/repositories/ICustomersRepository';
import { CustomersRepository } from '../../modules/customers/repositories/implementations/CustomersRepository';

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);

import { AppError } from '../../errors/AppError';

import { CustomersRepository } from '../../modules/customers/repositories/implementations/CustomersRepository';

export async function checkCustomer(id: number) {
  const getCustomers = await new CustomersRepository().findById(id);

  if (!getCustomers) {
    throw new AppError('Customer does not exists!');
  }
  return getCustomers;
}

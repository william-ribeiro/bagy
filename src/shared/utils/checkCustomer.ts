import { CustomersRepository } from '../../modules/customers/repositories/implementations/CustomersRepository';

export async function checkCustomer(id: number) {
  const getCustomers = await new CustomersRepository().findById(id);

  if (!getCustomers) {
    console.log(`ATENÇÃO cliente nao existe, ${id}`);
    return;
  }
  return getCustomers;
}

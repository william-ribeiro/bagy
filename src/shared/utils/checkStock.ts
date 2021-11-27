import { AppError } from '../../errors/AppError';
import { Product } from '../../modules/products/entities/Product';

interface IStock {
  product_id: number;
  quantity: number;
}

export function checkStock(products: Product[], data: IStock) {
  const findProduct = products.find((get) => get.id === data.product_id);

  if (!findProduct) {
    throw new AppError('Product does not exists!', 404);
  }

  if (findProduct.stock === 0) {
    throw new AppError('Stock is empty', 400);
  }

  if (findProduct.stock < data.quantity) {
    throw new AppError('The amount informed is greater than the available', 400);
  }
  delete findProduct.created_at;
  delete findProduct.updated_at;

  return findProduct;
}

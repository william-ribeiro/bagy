import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../errors/AppError';
import { IProductDTO } from '../dtos';
import { Product } from '../entities/Product';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: IProductDTO): Promise<Product> {
    const findProduct = await this.productsRepository.findById(data.id);

    if (!findProduct) {
      throw new AppError('Product not found!', 404);
    }
    const product = await this.productsRepository.update(data);
    return product;
  }
}

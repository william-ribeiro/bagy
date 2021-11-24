import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../errors/AppError';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export class DeleteProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(id: number): Promise<boolean> {
    const findProduct = await this.productsRepository.findById(id);

    if (!findProduct) {
      throw new AppError('Product not found!', 404);
    }
    return !!(await this.productsRepository.delete(id));
  }
}

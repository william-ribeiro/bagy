import { container } from 'tsyringe';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Product } from '../entities/Product';
import { ProductInput } from './ProductInput';
import { ProductsRepository } from '../repositories/implementations/ProductsRepository';
import { CreateProductUseCase } from '../useCases/CreateProductUseCase';
import { UpdateProductUseCase } from '../useCases/UpdateProductUseCase';
import { DeleteProductUseCase } from '../useCases/DeleteProductUseCase';

@Resolver(Product)
export class ProductsResolvers {
  private productsRepository: ProductsRepository = new ProductsRepository();

  @Query(() => [Product])
  async allProducts(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  @Query(() => Product, { nullable: true })
  async product(@Arg('productId') productId: number) {
    return this.productsRepository.findById(productId);
  }

  @Mutation(() => Product, { nullable: true })
  async creatProduct(@Arg('productInput') productInput: ProductInput): Promise<Product> {
    const createProductUseCase = container.resolve(CreateProductUseCase);

    const product = await createProductUseCase.execute(productInput);

    return product;
  }

  @Mutation(() => Product, { nullable: true })
  async updateProduct(
    @Arg('productInput') productInput: ProductInput,
    @Arg('id') id: number,
  ): Promise<Product> {
    const updateProductUseCase = container.resolve(UpdateProductUseCase);

    const product = await updateProductUseCase.execute({ id, ...productInput });

    return product;
  }

  @Mutation(() => Boolean)
  async deleteCProduct(@Arg('id') id: number): Promise<boolean> {
    const deleteproductUseCase = container.resolve(DeleteProductUseCase);

    return !!(await deleteproductUseCase.execute(id));
  }
}

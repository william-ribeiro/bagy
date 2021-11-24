import { EntityRepository, getRepository, Repository } from 'typeorm';
import { IProductDTO } from '../../dtos';
import { Product } from '../../entities/Product';
import { IProductsRepository } from '../IProductsRepository';

@EntityRepository(Product)
export class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  public async findAll(): Promise<Product[] | undefined> {
    return this.repository.find();
  }

  public async findByProduct(name: string): Promise<Product | undefined> {
    return this.repository.findOne({ name });
  }

  public async findById(id: number): Promise<Product | undefined> {
    return this.repository.findOne({ id });
  }

  public async update(Product: IProductDTO): Promise<Product> {
    return this.repository.save(Product);
  }

  public async create(data: IProductDTO): Promise<Product> {
    const createProduct = this.repository.create(data);
    await this.repository.save(createProduct);
    return createProduct;
  }

  public async delete(id: number): Promise<boolean> {
    return !!(await this.repository.delete(id));
  }
}

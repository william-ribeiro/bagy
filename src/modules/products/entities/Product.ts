import { Field, ID, Int, Float, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { OrderProduct } from '../../orders/entities/OrderProduct';

@Entity('products')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly id: number;

  @CreateDateColumn({ type: 'datetime' })
  @Field(() => Date)
  created_at: Date;

  @CreateDateColumn({ type: 'datetime' })
  @Field(() => Date)
  updated_at: Date;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  image_url: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column('decimal')
  @Field(() => Float)
  weight: number;

  @Column()
  @Field(() => Float)
  price: number;

  @Column()
  @Field(() => Int)
  stock: number;

  @ManyToOne(() => OrderProduct, (orderProduct) => orderProduct.products)
  order_product: OrderProduct;
}

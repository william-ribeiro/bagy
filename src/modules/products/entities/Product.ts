import { Field, ID, Int, Float, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderProduct } from '../../orders/entities/OrderProduct';

@Entity('products')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @CreateDateColumn()
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

  @Column()
  @Field(() => Float)
  weight: number;

  @Column()
  @Field(() => Float)
  price: number;

  @Column()
  @Field(() => Int)
  stock: number;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orders_products: OrderProduct[];
}

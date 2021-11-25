import { Field, ID, Int, Float, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from '../../products/entities/Product';
import { Order } from './Order';

@Entity('orders_products')
@ObjectType()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @CreateDateColumn()
  @Field(() => Date)
  updated_at: Date;

  @Column()
  @Field(() => Int)
  order_id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  @Field(() => Int)
  product_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column()
  @Field(() => Float)
  price: number;
}

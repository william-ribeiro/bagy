import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from '../../products/entities/Product';
import { Order } from './Order';

@Entity('orders_products')
@ObjectType()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly id: number;

  @CreateDateColumn({ type: 'datetime' })
  @Field(() => Date)
  created_at: Date;

  @CreateDateColumn({ type: 'datetime' })
  @Field(() => Date)
  updated_at: Date;

  @Column()
  @Field(() => Int)
  order_id: number;

  @ManyToOne(() => Order, (order) => order.orders_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  @Field(() => Int)
  product_id: number;

  @OneToMany(() => Product, (product) => product.order_product)
  @JoinColumn({ name: 'product_id' })
  @Field(() => [Product])
  products: Product[];

  @Column('int')
  @Field(() => Int)
  quantity: number;
}

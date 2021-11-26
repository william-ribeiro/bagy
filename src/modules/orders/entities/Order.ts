import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Customer } from '../../customers/entities/Customer';
import { OrderProduct } from './OrderProduct';

@Entity('orders')
@ObjectType()
export class Order {
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
  customer_id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders, { cascade: true, eager: true })
  @JoinColumn({ name: 'customer_id' })
  @Field(() => Customer)
  customer: Customer;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
    eager: true,
  })
  @Field(() => [OrderProduct])
  orders_products: OrderProduct[];

  @Column()
  @Field(() => Int)
  installments: number;

  total_installments?: number;

  @Column('decimal')
  @Field(() => Float)
  total: number;

  @Column()
  @Field()
  status: 'request' | 'in_progress' | 'recused' | 'delivered' | 'cancelled';
}

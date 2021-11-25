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

import { Customer } from '../../customers/entities/Customer';
import { OrderProduct } from './OrderProduct';

@Entity('orders')
@ObjectType()
export class Order {
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
  customer_id: number;

  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  @Field(() => Customer)
  customer: Customer;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
    eager: true,
  })
  products: OrderProduct[];

  @Column()
  @Field(() => Int)
  installments: number;

  @Column()
  @Field({ description: "'request' | 'in_progress' | 'recused' | 'delivered' | 'cancelled'" })
  status: 'request' | 'in_progress' | 'recused' | 'delivered' | 'cancelled';
}

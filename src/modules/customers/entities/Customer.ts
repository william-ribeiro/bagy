import { Field, ID, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../orders/entities/Order';

@Entity('customers')
@ObjectType()
export class Customer {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly id?: number;

  @CreateDateColumn({ type: 'datetime' })
  @Field(() => Date)
  created_at?: Date;

  @CreateDateColumn({ type: 'datetime' })
  @Field(() => Date)
  updated_at?: Date;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column({ unique: true })
  @Field(() => String)
  cpf: string;

  @Column({ nullable: true })
  @Field(() => String)
  birth_date: string;

  @Column({ nullable: true })
  @Field(() => String)
  street: string;

  @Column({ nullable: true })
  @Field(() => String)
  street_number: string;

  @Column({ nullable: true })
  @Field(() => String)
  district: string;

  @Column({ nullable: true })
  @Field(() => String)
  city: string;

  @Column({ nullable: true })
  @Field(() => String)
  zip_code: string;

  @Column({ nullable: true })
  @Field(() => String)
  state: string;

  @Column({ nullable: true })
  @Field(() => String)
  country: string | null = null;

  @OneToMany(() => Order, (order) => order.customer)
  orders?: Order[];
}

import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('customers')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly id: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @CreateDateColumn()
  @Field(() => Date)
  updated_at: Date;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column({ unique: true })
  @Field(() => String)
  cpf: string;

  @Column()
  @Field(() => String)
  birth_date: string;

  @Column()
  @Field(() => String)
  street: string;

  @Column()
  @Field(() => String)
  street_number: string;

  @Column()
  @Field(() => String)
  district: string;

  @Column()
  @Field(() => String)
  city: string;

  @Column()
  @Field(() => String)
  zip_code: string;

  @Column()
  @Field(() => String)
  state: string;

  @Column()
  @Field(() => String)
  country: string;
}

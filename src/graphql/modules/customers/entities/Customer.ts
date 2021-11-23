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
  email: string;
}

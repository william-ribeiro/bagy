import { Field, InputType, Int } from 'type-graphql';
import { Customer } from '../../customers/entities/Customer';

@InputType()
export class OrderProductInput {
  @Field(() => Int)
  product_id?: number;
  @Field(() => Int)
  quantity?: number;
}

@InputType()
export class OrderInput {
  @Field(() => Int)
  customer_id?: number;

  customer?: Customer;
  @Field(() => Int)
  installments?: number;

  @Field(() => [OrderProductInput])
  products?: OrderProductInput[];
  total?: number;
  total_installments?: number;
  status?: 'request' | 'in_progress' | 'recused' | 'delivered' | 'cancelled';
}

@InputType()
export class UpdateOrderInput {
  @Field(() => Int)
  order_id?: number;
  @Field(() => String)
  status?: 'request' | 'in_progress' | 'recused' | 'delivered' | 'cancelled';
}

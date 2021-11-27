import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class OrderProductInput {
  @Field(() => Int)
  product_id: number;
  @Field(() => Int)
  quantity: number;
}

@InputType()
export class OrderInput {
  @Field(() => Int)
  customer_id: number;

  @Field(() => Int)
  installments: number;

  @Field(() => [OrderProductInput])
  products: OrderProductInput[];
}

@InputType()
export class UpdateOrderInput {
  @Field(() => Int)
  order_id?: number;
  @Field(() => String)
  status?: 'request' | 'in_progress' | 'recused' | 'delivered' | 'cancelled';
}

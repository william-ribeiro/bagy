import { Field, Float, InputType, Int } from 'type-graphql';
import { Customer } from '../../customers/entities/Customer';
import { Product } from '../../products/entities/Product';
import { Order } from '../entities/Order';

@InputType()
export class OrderInput {
  @Field(() => Int)
  customer_id: number;

  @Field(() => Int)
  installments: number;

  @Field(() => String)
  status: 'request' | 'in_progress' | 'recused' | 'delivered' | 'cancelled';
}

// @InputType()
// export class OrderProductInput {
//   @Field(() => [Order])
//   order: [Order];

//   @Field(() => [Product])
//   product: Product[];

//   @Field(() => Int)
//   quantity: number;

//   @Field(() => Float)
//   price: number;
// }

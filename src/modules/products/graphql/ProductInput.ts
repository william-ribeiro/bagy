import { Length } from 'class-validator';
import { Field, InputType, Float, Int } from 'type-graphql';

@InputType()
export class ProductInput {
  @Field(() => String)
  @Length(1, 255)
  name: string;

  @Field(() => String)
  img_url: string;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  weight: number;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  stock: number;
}

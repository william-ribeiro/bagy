import { Field, InputType } from 'type-graphql';

@InputType()
export class CustomerInput {
  @Field(() => String)
  email: string;
}

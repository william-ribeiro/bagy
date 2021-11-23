import { Field, InputType } from 'type-graphql';

@InputType()
export class CustomerInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  cpf: string;

  @Field({ nullable: true })
  birth_date: string | null = null;

  @Field({ nullable: true })
  street: string;

  @Field({ nullable: true })
  street_number: string;

  @Field({ nullable: true })
  district: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  zip_code: string;

  @Field({ nullable: true })
  state: string;

  @Field({ nullable: true })
  country: string;
}

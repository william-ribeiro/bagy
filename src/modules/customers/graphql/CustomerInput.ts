import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CustomerInput {
  @Field(() => String)
  @Length(1, 255)
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  cpf: string;

  @Field(() => String, { nullable: true })
  birth_date: string;

  @Field(() => String, { nullable: true })
  street: string;

  @Field(() => String, { nullable: true })
  street_number: string;

  @Field(() => String, { nullable: true })
  district: string;

  @Field(() => String, { nullable: true })
  city: string;

  @Field(() => String, { nullable: true })
  zip_code: string;

  @Field(() => String, { nullable: true })
  state: string;

  @Field(() => String, { nullable: true })
  country: string;
}

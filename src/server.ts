import 'dotenv/config';
import 'reflect-metadata';
import './shared/container';

import { Connection } from './database';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { CustomerResolvers } from './modules/customers/graphql/CustomerResolvers';
import { ProductsResolvers } from './modules/products/graphql/ProductResolvers';
import { OrderResolvers } from './modules/orders/graphql/OrderResolvers';

async function bootstrap() {
  Connection();
  const schema = await buildSchema({
    resolvers: [CustomerResolvers, ProductsResolvers, OrderResolvers],
  });

  const server = new ApolloServer({
    introspection: true,
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  server
    .listen(process.env.PORT || 4000)
    .then(({ url }) =>
      console.log(`🚀 The [${process.env.NODE_ENV}] server is running at ${url}graphql`),
    );
}

bootstrap();

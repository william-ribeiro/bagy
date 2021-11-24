import 'dotenv/config';
import 'reflect-metadata';
import './shared/container';
import { cconnection } from './database';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';

import { CustomerResolvers } from './modules/customers/graphql/CustomerResolvers';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

async function bootstrap() {
  cconnection();
  const schema = await buildSchema({
    resolvers: [CustomerResolvers],
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  server
    .listen(4000)
    .then(({ url }) =>
      console.log(`🚀 The [${process.env.NODE_ENV}] server is running at ${url}graphql`),
    );
}

bootstrap();

import 'dotenv/config';
import 'reflect-metadata';
import { cconnection } from './database';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';

import { CustomerResolvers } from './graphql/modules/customers/schemas/CustomerResolvers';
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

  server.listen(4000, () =>
    console.warn(`🚀 The server is running in the environment <${process.env.NODE_ENV}>!`),
  );
}

bootstrap();

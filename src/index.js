import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql/schemas,';
import { context } from './graphql/context';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // através do context é possível compartilhar
  // a mesma função/objeto/dado dentre seus inúmeros resolvers.
  context,
});

server.listen(4003).then(({ url }) => console.log(`Server listening ${url}`));

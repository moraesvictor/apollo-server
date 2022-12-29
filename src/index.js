import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql/schemas,';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4003).then(({ url }) => console.log(`Server listening ${url}`));

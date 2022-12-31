import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql/schemas,';
import fetch from 'node-fetch';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      fetch,
    };
  },
});

server.listen(4003).then(({ url }) => console.log(`Server listening ${url}`));

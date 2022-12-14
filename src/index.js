import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  // define route type
  typeDefs: gql`
    type Query {
      payload: String
      id: ID
      age: Int
      name: String
    }
  `,
  resolvers: {
    Query: {
      payload: () => 'Hello darkness my old friend',
      id: () => '12381248123',
      age: () => 28,
      name: () => 'Victor Moraes',
    },
  },
});

server.listen(4003).then(({ url }) => console.log(`Server listening ${url}`));

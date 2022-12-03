import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  // define route type
  typeDefs: gql`
    type Query {
      payload: String
    }
  `,
});

server.listen(4003).then(({ url }) => console.log(`Server listening ${url}`));

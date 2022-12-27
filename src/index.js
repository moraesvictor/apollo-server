import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  // define route type
  typeDefs: gql`
    type Query {
      user: User!
      users: [User!]!
    }

    type User {
      payload: String
      id: ID
      age: Int
      name: String
      arrayString: [String!]!
    }
  `,
  resolvers: {
    Query: {
      user: () => {
        return {
          payload: 'Hello darkness my old friend',
          id: '12381248123',
          age: 28,
          name: 'Victor Moraes',
        };
      },
      users: () => {
        return [
          {
            payload: 'Hello darkness my old friend',
            id: '12381248123',
            age: 28,
            name: 'Victor Moraes',
          },
          {
            payload: 'Hello darkness my old friend',
            id: '1238124812123',
            age: 26,
            name: 'Thaise Moraes',
          },
        ];
      },
    },
  },
});

server.listen(4003).then(({ url }) => console.log(`Server listening ${url}`));

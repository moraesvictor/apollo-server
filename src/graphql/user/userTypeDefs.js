import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  extend type Query {
    # Para passar um argumento para o nosso tipo, devemos primeiramente
    # ter a necessidade para isso, como vemos em user, que precisamos especificar
    # a qual usuário estamos fazendo referência.
    # Uma vez feita essa verificação, é necessário apenas abrir parênteses e passar
    # o orgumento desejado para dentro de do tipo.
    # resolver(argumento: tipoDoArgumento): tipoDoResolver
    user(id: ID!): User!
    users: [User!]!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    indexRef: Int!
    createdAt: String!
  }
`;

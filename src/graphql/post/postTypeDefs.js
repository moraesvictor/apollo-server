import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): Post!
    posts(input: ApiFiltersInput): [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    # user: User!
    indexRef: Int!
    createdAt: String!
    unixTimestamp: String!
  }

  ## Interface ##
  # Um tipo pode estar de acordo com o contrato de sua interface
  # ou seja, um type precisará dos campos presentes na interface declarada.
  # Garantindo assim a uniformidade dentro da aplicação...
  # exemplificando

  # interface PostError {
  #   statusCode: Int!
  #   message: String!
  # }

  # O tipo PostNotFoundError está de acordo com o contrato de sua interface PostError.
  # portanto ele precisará dos campos declarados em PostError, podendo possuir mais além destes.
  # Desta forma, a interface garante a uniformidade dos erros presentes na aplicação...
  # type PostNotFoundError implements PostError {
  #   statusCode: Int!
  #   message: String!
  #   postId: String!
  # }

  # O mesmo cenário vale para PostTimeOutError...
  # type PostTimeoutError implements PostError {
  #   statusCode: Int!
  #   message: String!
  #   timeout: Int!
  # }
`;

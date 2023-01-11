import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): PostResult!
    posts(input: ApiFiltersInput): [Post!]!
  }

  union PostResult = PostNotFoundError | PostTimeoutError | Post

  interface PostError {
    statusCode: Int!
    message: String!
  }

  # PostNotFound está de acordo com o contrato de que sua interface é PostError
  # ou seja, o type PostNotFound precisa dos campos presentes na interface PostError.
  # Garantindo assim a uniformidade de erros dentro da aplicação...
  type PostNotFoundError implements PostError {
    statusCode: Int!
    message: String!
    postId: String!
  }

  type PostTimeoutError implements PostError {
    statusCode: Int!
    message: String!
    timeout: Int!
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
`;

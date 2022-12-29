import { gql } from 'apollo-server';
import { userTypeDefs } from './user/userTypeDefs';
import { userResolvers } from './user/userResolvers';

export const rootTypeDefs = gql`
  #  routeTypes
  type Query {
    _empty: Boolean
  }
`;

export const rootResolvers = {
  Query: {
    _empty: () => false,
  },
};

export const typeDefs = [rootTypeDefs, userTypeDefs];
export const resolvers = [rootResolvers, userResolvers];

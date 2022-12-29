import { gql } from 'apollo-server';
import { userTypeDefs } from './user/userTypeDefs';
import { userResolvers } from './user/userResolvers';
import { postTypeDefs } from './post/postTypeDefs';
import { postResolvers } from './post/postResolvers';

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

export const typeDefs = [rootTypeDefs, userTypeDefs, postTypeDefs];
export const resolvers = [rootResolvers, userResolvers, postResolvers];

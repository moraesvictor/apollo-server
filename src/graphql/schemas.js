import { gql } from 'apollo-server';
import { userTypeDefs } from './user/userTypeDefs.js';
import { userResolvers } from './user/userResolvers.js';
import { postTypeDefs } from './post/postTypeDefs.js';
import { postResolvers } from './post/postResolvers.js';
import { ApiFiltersTypedefs } from './api-filters/apiFiltersTypedefs.js';
import { ApiFiltersResolvers } from './api-filters/apiFiltersResolvers.js';

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

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  postTypeDefs,
  ApiFiltersTypedefs,
];
export const resolvers = [
  rootResolvers,
  userResolvers,
  postResolvers,
  ApiFiltersResolvers,
];

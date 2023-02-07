import { getRoute } from './utils/utils.js';
import fetch from 'node-fetch';
import { makeDataLoader } from './user/dataloader.js';

// const getUsersRoute = (_) => getRoute(fetch)(_, 'users');

export const context = () => {
  return {
    makeUserDataLoader: makeDataLoader(getRoute('', 'users'), 'users'),
    getRoute: getRoute(fetch),
  };
};

import { getRoute } from './utils/utils.js';
import fetch from 'node-fetch';
import { makeDataLoader } from './utils/dataloader.js';

export const context = () => {
  return {
    makeUserDataLoader: makeDataLoader(
      (_) => getRoute(fetch)(_, 'users'),
      'users',
    ),
    makePostDataLoader: makeDataLoader(
      (_) => getRoute(fetch)(_, 'posts'),
      'posts',
    ),
    getRoute: getRoute(fetch),
  };
};

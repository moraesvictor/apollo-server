import { getRoute } from './utils/utils.js';
import fetch from 'node-fetch';
import { makeDataLoader } from './utils/dataloader.js';

export const context = () => {
  return {
    makeUserDataLoader: makeDataLoader(
      () => getRoute(fetch)('', 'users'),
      'users',
    ),
    makePostDataLoader: makeDataLoader(
      () => getRoute(fetch)('', 'posts'),
      'posts',
    ),
    getRoute: getRoute(fetch),
  };
};

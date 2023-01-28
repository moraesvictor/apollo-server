import { getRoute } from './utils/utils.js';
import fetch from 'node-fetch';

export const context = () => {
  return {
    getRoute: getRoute(fetch),
  };
};

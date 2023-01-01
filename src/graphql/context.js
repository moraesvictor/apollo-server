import fetch from 'node-fetch';

const getUsers = (path = '') => fetch(`http://localhost:3000/users/${path}`);

export const context = () => {
  return {
    getUsers,
  };
};

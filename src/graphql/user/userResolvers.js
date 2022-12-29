const user = () => {
  return {
    id: '1',
    userName: 'Victor',
  };
};

const users = () => {
  return [
    { id: '1', userName: 'Victor' },
    { id: '2', userName: 'Thaíse' },
  ];
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};

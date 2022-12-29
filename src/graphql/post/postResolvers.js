const post = () => {
  return {
    id: '1',
    title: 'look at me',
  };
};

const posts = () => {
  return [
    { id: '1', title: 'look at me' },
    { id: '2', title: 'look at me' },
  ];
};
export const postResolvers = {
  Query: {
    post,
    posts,
  },
};

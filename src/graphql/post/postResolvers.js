const post = async (_, { id }, { getRoute }) => {
  const response = await getRoute(`${id}`, 'posts');

  const post = await response.json();

  return post;
};

const posts = async (_, __, { getRoute }) => {
  const response = await getRoute(_, 'posts');

  return response.json();
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
};

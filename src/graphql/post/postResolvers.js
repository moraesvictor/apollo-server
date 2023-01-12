const post = async (_, { id }, { getRoute }) => {
  const response = await getRoute(`${id}`, 'posts');

  const post = await response.json();

  if (Math.random() > 0.999)
    return { statusCode: 500, message: 'Post timeout', timeout: 123 };

  if (typeof post.id === 'undefined')
    return { statusCode: 404, message: 'Post not found', postId: id };

  return post;
};

const posts = async (_, { input }, { getRoute }) => {
  const apiQueryParams = new URLSearchParams(input);

  const response = await getRoute(
    _,
    'posts' + '/?' + apiQueryParams.toString(),
  );

  return response.json();
};

// O primeiro parâmetro do resolver é o objeto o qual estamos trabalhando,
// ou seja, ele é o próprio Post nesse caso.
// Porém, não temos acesso a ele na Query, pois a Query é a entrada dos nossos Resolvers.
// Quando os desestruturamos e pegamos numa camada mais abaixo, é possível utilizar esses valores do objeto.
// Esse objeto também pode ser chamado de parent.
const unixTimestamp = (obj) => {
  const timestamp = new Date(obj.createdAt).getTime() / 1000;

  return Math.floor(timestamp);
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },

  Post: {
    unixTimestamp,
  },

  PostResult: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';
      if (typeof obj.id !== 'undefined') return 'Post';

      return null;
    },
  },

  PostError: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';

      return null;
    },
  },
};

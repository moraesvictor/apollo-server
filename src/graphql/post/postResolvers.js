import { makeDataLoader } from '../user/dataloader.js';

/**
 *  O primeiro parâmetro do resolver é o objeto o qual estamos trabalhando,
 ou seja, ele é o próprio Post nesse caso.
 Porém, não temos acesso a ele na Query, pois a Query é a entrada dos nossos Resolvers.
 Quando os desestruturamos e pegamos numa camada mais abaixo, é possível utilizar esses valores do objeto.
 Esse objeto também pode ser chamado de parent.
 Exemplo:
  const unixTimestamp = (obj) => {
   const timestamp = new Date(obj.createdAt).getTime() / 1000;

   return Math.floor(timestamp);
 };
 */
const post = async (_, { id }, { getRoute }) => {
  const response = await getRoute(`${id}`, 'posts');

  const post = await response.json();

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

const user = async (obj, _, { getRoute }) => {
  return makeDataLoader(getRoute).load(obj.userId);
};

export const postResolvers = {
  Query: { post, posts },
  Post: { user },
};

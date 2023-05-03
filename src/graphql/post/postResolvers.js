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
const post = async (_, { id }, { dataSources }) => {
  return dataSources.postsDataSource.getPost(id);
};

const posts = async (_, { input }, { dataSources }) => {
  return dataSources.postsDataSource.getPosts(input);
};

const user = async (obj, _, { dataSources }) => {
  return dataSources.userDataSource.dataLoader.load(obj.userId);
};

export const postResolvers = {
  Query: { post, posts },
  Post: { user },
};

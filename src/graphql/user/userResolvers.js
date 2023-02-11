// O segundo parâmetro da função é o argumento do resolver, que está tipado
// no seu respectivo TypeDefs.
// No exemplo abaixo podemos notar o argumento *id*, que foi passado para user(id: ID!): String!...
// Desta forma o GQL consegue receber o id do usuário e passar para user quando fizer a requisição.
const user = async (_, { id }, { getRoute }) => {
  const response = await getRoute(`${id}`, 'users');

  const user = await response.json();

  return user;
};

// O terceiro parâmetro da função de um resolver está relacionada diretamente ao
// valor declarado no context do ApolloServer.
// Exemplificando: context: () => { return { magic: "mágica"}}
// O terceiro parâmetro da minha função compartilhará em todos os resolvers o mesmo valor 'mágica'.

const users = async (_, __, { getRoute }) => {
  const response = await getRoute(_, 'users');

  return response.json();
};

const posts = async (obj, _, { makePostDataLoader }) => {
  return makePostDataLoader.load(obj.id);
};

export const userResolvers = {
  Query: { user, users },
  User: { posts },
};

// O segundo parâmetro da função é o argumento do resolver, que está tipado
// no seu respectivo TypeDefs.
// No exemplo abaixo podemos notar o argumento *id*, que foi passado para user(id: ID!): String!...
// Desta forma o GQL consegue receber o id do usuário e passar para user quando fizer a requisição.
const user = async (_, { id }, { fetch }) => {
  const getUser = await fetch(`http://localhost:3000/users/${id}`);

  const user = await getUser.json();

  return user;
};

// O terceiro parâmetro da função de um resolver está relacionada diretamente ao
// valor declarado no context do ApolloServer.
// Exemplificando: context: () => { return { magic: "mágica"}}
// O terceiro parâmetro da minha função compartilhará em todos os resolvers o mesmo valor 'mágica'.

const users = async (_, __, { fetch }) => {
  const getUsers = await fetch('http://localhost:3000/users/');

  return getUsers.json();
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};

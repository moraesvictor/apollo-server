import Dataloader from 'dataloader';
import fetch from 'node-fetch';

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

/**
 * ## DataLoader
 * O Dataloader genéricamente tem a função de ser um data fetching layer,
 * garatindo assim uma API consistente.
 * Neste caso, ele servirá a fim de evitar que ocorra o problema n + 1.
 * Ou seja, sua finalidade está voltada para performance.
 *
 * Podemos observar na nossa aplicação que um usuário pode ter infinitos posts relacionados a seu id.
 * Portanto, quando é realizada uma chamada de Posts, inúmeros usuários podem ser chamados e por muitas vezes
 * de forma repetida.
 * Esse problema pode ser solucionado de diversas formas.
 * Uma delas é com a implementação do Dataloader que faz parte do GraphQL.
 *
 * O Dataloader funciona a partir de dois princípios fundamentais: (Batching e caching)
 * Cada DataLoader é tem um único Cache.
 *
 * ## Batching
 * Batch significa Lote em inglês, ou seja, signfica que o processamento dos dados é feito por lotes.
 * Batching é muito importante quando pensamos em realizar um fetch de algo de mesma DB simultaneamente.
 * Podemos pensar da seguinte forma:
 * Uma aplicação que está rodando e em diversos pedaços fazendo requisições ao mesmo tempo para a mesma DB.
 *
 * Em resumo, o DataLoader fornece o batching para que possamos fazer o data fetch das informações úteis naquele momento específico
 * da request de uma forma performática atrávés do conceito de lotes...
 *
 * Batching é o primeiro parâmetro de DataLoader e será uma função que irá se comunicar com a DB e retornará um Promise<unknown[]>...
 *
 * ## Caching
 * Caching possui um conceito mais simplificado neste caso.
 *
 * Grosso modo, se as chaves forem iguais o fetch será feito apenas uma vez. Ou eja, para mesmos valores(chaves), você terá a mesma promise.
 * Ex:
 * var promiseA = userLoader(1);
 * var promiseB = userLoader(1);
 *
 * assert(promiseA === promiseB)
 *
 * ### Resumindo o DataLoader nesta aplicação.
 *
 * Haverá uma chamada única para posts e uma chamadada única para todos os usários. Dessa forma não exisitirão milhares de requisições...
 *
 * Exemplificando:
 *
 * GET posts/?
 * GET users/?id=...[array de usuarios feito através do join]
 *
 * Feitas essas requisições, tudo será salvo no cache.
 *
 * https://www.youtube.com/watch?v=OQTnXNCDywA
 */

const userDataLoader = new Dataloader(async (ids) => {
  const urlQuery = ids.join('&id=');
  const url = `http://localhost:3000/users/?id=${urlQuery}`;

  const response = await fetch(url);
  const users = await response.json();

  console.log(users);
  return ids.map((id) => users.find((user) => user.id === id));
});

const user = async (obj) => {
  return userDataLoader.load(obj.userId);
};

export const postResolvers = {
  Query: { post, posts },
  Post: { user },
};

import DataLoader from 'dataloader';

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
 *F
 * Feitas essas requisições, tudo será salvo no cache.
 *
 * https://www.youtube.com/watch?v=OQTnXNCDywA
 */

export const makeDataLoader = (getRoute, path) =>
  new DataLoader(async (ids) => {
    /**
     * Junção dos parâmetros da URL para o caso de USERS.
     */
    const userUrlQuery = ids.reduce((url, newParam) => url + `&id=${newParam}`);
    /**
     * Junção dos parâmetros da URL para o caso de POSTS.
     */
    const postUrlQuery = ids.reduce(
      (url, newParam) => url + `&userId=${newParam}`,
    );

    /**
     * Resposta da API através da função getRoute para o caso de USERS
     */
    const responseUsers = await getRoute(`?id=${userUrlQuery}`, path);
    /**
     * Resposta da API através da função getRoute para o caso de POSTS
     */
    const posts = await getRoute(`?iuserId=${postUrlQuery}`, path);

    const users = await responseUsers.json();

    if (path === 'posts')
      return ids.map((id) => posts.filter((post) => post.userId === id));
    return ids.map((id) => users.find((user) => user.id === id));
  });

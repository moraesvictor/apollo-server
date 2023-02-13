import { ApolloServer } from 'apollo-server';
// import { typeDefs, resolvers } from './graphql/schemas';
import { typeDefs, resolvers } from './graphql/schemas.js';
import { context } from './graphql/context.js';
import * as dotenv from 'dotenv';
import { PostDataSource } from './graphql/post/dataSource.js';
import { UserDataSource } from './graphql/user/dataSource.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Através do context é possível compartilhar
  // a mesma função/objeto/dado dentre seus inúmeros resolvers.
  context,

  // Data Source é uma classe que é tem sua response armazenada no contexto do Apollo
  // sua principal utlidade neste caso é fazer os métodos HTTP de uma API Rest na nossa aplicação.
  // O Ideal é que cada type seja feito em um arquivo diferente, para que não haja problema de chaves no cache
  // no momento da requisição.
  // A grande facilidade do DataSource se dá na facilidade de manejo das operações que desejamos fazer, seja get, post e etc...
  // Desta forma, evitamos fazer um fetch através do node-fetch ou de maneira nativa.
  // Resumindo:
  // Ao invés de criarmos uma função para fazer o fetch, criarmos toda uma esquematização na outra função para transformar aquilo
  // em um JSON e todo esse procedimento padrão. A classe DataSource já nos proporciona os métodos.
  dataSources: () => ({
    postsDataSource: new PostDataSource(),
    userDataSource: new UserDataSource(),
  }),
});

//Instanciar dotEnv junto ao apollo acaba sendo mais proveitoso que apenas
//no package.json
dotenv.config();

server.listen(4003).then(({ url }) => console.log(`Server listening ${url}`));

import { ApolloServer } from 'apollo-server';
// import { typeDefs, resolvers } from './graphql/schemas';
import { typeDefs, resolvers } from './graphql/schemas.js';
import { context } from './graphql/context.js';
import * as dotenv from 'dotenv';
import { PostDataSource } from './graphql/post/dataSource.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // através do context é possível compartilhar
  // a mesma função/objeto/dado dentre seus inúmeros resolvers.
  context,
  dataSources: () => ({ postsDataSource: new PostDataSource() }),
});

//intanciar dotEnv junto ao apollo acaba sendo mais proveitoso que apenas
//no package.json
dotenv.config();

server.listen(4003).then(({ url }) => console.log(`Server listening ${url}`));

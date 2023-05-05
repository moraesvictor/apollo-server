## Apollo Server

### Brief 

This project is a GraphQL API built with Apollo Server that utilizes a fake API to provide data. The server is designed to provide high performance and scalability, with technologies such as DataSources used to avoid common performance problems like n+1 queries. By using GraphQL, the API offers a flexible and intuitive way for clients to query and manipulate data.

The project includes features such as authentication, caching, and batching to ensure data is delivered efficiently and securely. The code is written in a modular and maintainable way, making it easy to add new features or modify existing ones.

Overall, this project offers a powerful and efficient way to provide data to clients, while maintaining a high level of flexibility and scalability.

### Install and exemples

1. Install the required dependencies:
    ```
    npm install apollo-server graphql
    ```
2. Create a GraphQL schema:

    ```javascript
    const { gql } = require('apollo-server');

    const typeDefs = gql`
      type Query {
        hello: String
      }
    `;
    ```

3. Create a resolver function for the hello query:

    ```javascript
    const resolvers = {
      Query: {
        hello: () => 'Hello, world!',
      },
    };
    ```

4. Create an instance of Apollo Server and pass in the schema and resolver functions:

    ```javascript
    const { ApolloServer } = require('apollo-server');

    const server = new ApolloServer({ typeDefs, resolvers });

    server.listen().then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
    ```

5. Run the server with `node index.js`.

6. Open your web browser and navigate to http://localhost:4000 (or the URL specified in the console output).

7. In the GraphQL Playground, run the hello query to see the response:

    ```graphql
    query {
      hello
    }
    ```

const { ApolloServer, gql } = require('apollo-server'),
  // queries = require('./app/queries'),
  resolvers = require('./app/resolvers');

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;
const server = new ApolloServer({
  typeDefs,
  resolvers
});
module.exports = server;

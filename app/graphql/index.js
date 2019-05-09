const { ApolloServer } = require('apollo-server'),
  { makeExecutableSchema } = require('graphql-tools'),
  typeDef = require('./types'),
  users = require('./users'),
  healthCheck = require('./healthCheck');

const typeDefs = [typeDef, ...users.schemas, ...healthCheck.schemas];

module.exports = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers: {
      Query: {
        ...users.queries,
        ...healthCheck.queries
      },
      Mutation: {
        ...users.mutations
      }
    }
  })
});

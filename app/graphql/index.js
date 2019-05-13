const { ApolloServer } = require('apollo-server'),
  { makeExecutableSchema } = require('graphql-tools'),
  types = require('./types'),
  inputs = require('./inputs'),
  users = require('./users'),
  healthCheck = require('./healthCheck');

const typeDefs = [types, inputs, ...users.schemas, ...healthCheck.schemas];

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

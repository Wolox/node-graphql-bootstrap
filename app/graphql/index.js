const { ApolloServer } = require('apollo-server'),
  typeDefs = require('./types'),
  users = require('./users'),
  healthCheck = require('./healthCheck');

module.exports = new ApolloServer({
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
});

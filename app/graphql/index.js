const { ApolloServer } = require('apollo-server'),
  typeDefs = require('./types'),
  users = require('./users');

module.exports = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      ...users.queries
    },
    Mutation: {
      ...users.mutations
    }
  }
});

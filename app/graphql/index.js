const { ApolloServer, gql } = require('apollo-server'),
  users = require('./users');

module.exports = new ApolloServer({
  typeDefs: gql`
    type User {
      name: String!
    }

    type Mutation {
      show(name: String!): String!
    }

    type Query {
      view(name: String!): String
    }
  `,
  resolvers: {
    Query: {
      ...users.queries
    },
    Mutation: {
      ...users.mutations
    }
  }
});

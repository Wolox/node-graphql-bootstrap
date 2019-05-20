const { createTestClient } = require('apollo-server-testing'),
  { ApolloServer } = require('apollo-server'),
  schema = require('../app/graphql');

const { query, mutate } = createTestClient(new ApolloServer({ schema }));
module.exports = { query, mutate };

const { createTestClient } = require('apollo-server-testing'),
  { ApolloServer } = require('apollo-server'),
  schema = require('../app/graphql');

const { query: _query, mutate: _mutate } = createTestClient(new ApolloServer({ schema }));

const query = params => _query({ query: params });

const mutate = (mutation, variables) => _mutate({ mutation, variables });

module.exports = { query, mutate };

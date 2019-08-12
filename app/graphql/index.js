const { makeExecutableSchema } = require('graphql-tools'),
  { applyMiddleware } = require('graphql-middleware'),
  { gql } = require('apollo-server'),
  { importModules } = require('./scripts');

const modules = importModules();

const rootTypeDefinition = gql`
  type Query
  type Mutation
  type Subscription
`;
const typeDefs = [rootTypeDefinition, ...modules.typeDefs];
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: modules.resolvers
});

module.exports = applyMiddleware(schema, modules.middlewares);

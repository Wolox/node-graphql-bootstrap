const { makeExecutableSchema } = require('graphql-tools'),
  { applyMiddleware } = require('graphql-middleware'),
  { gql } = require('apollo-server'),
  { importEverything } = require('./scripts');

const modules = importEverything();

console.log(modules);

const rootTypeDefinition = gql`
  type Query
  type Mutation
  type Subscription
`;
const typeDefs = [rootTypeDefinition, ...modules.schemas];
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: modules.resolvers
});

module.exports = applyMiddleware(schema, {
  ...modules.middlewares
});

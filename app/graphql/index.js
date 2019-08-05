const { makeExecutableSchema } = require('graphql-tools'),
  { applyMiddleware } = require('graphql-middleware'),
  { importEverything, destructureModules } = require('./scripts');

const { types, inputs, enums, modules } = importEverything();

const destructuredModules = destructureModules(modules);

const schema = makeExecutableSchema({
  typeDefs: [types, inputs, ...destructuredModules.schemas],
  resolvers: {
    ...destructuredModules.resolvers,
    ...enums
  }
});

module.exports = applyMiddleware(schema, {
  ...destructuredModules.middlewares
});

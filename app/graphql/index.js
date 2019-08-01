const { makeExecutableSchema } = require('graphql-tools'),
  { applyMiddleware } = require('graphql-middleware'),
  fs = require('fs'),
  path = require('path');

const importEverything = () =>
  fs.readdirSync(__dirname, { withFileTypes: true }).reduce(
    (imports, dirent) => {
      if (dirent.isDirectory()) {
        imports.modules.push({ ...require(path.join(__dirname, dirent.name)) });
      }
      imports[dirent.name.replace(/.js/gi, '')] = require(path.join(__dirname, dirent.name));
      return imports;
    },
    { modules: [] }
  );

const { types, inputs, enums, modules } = importEverything();

const destructureModules = () => {
  const rootObject = { Query: {}, Mutation: {}, Subscription: {} };
  return modules.reduce(
    (destructuredModules, currentModule) => {
      destructuredModules.schemas.push(...currentModule.schemas);

      destructuredModules.resolvers = {
        ...destructuredModules.resolvers,
        Query: {
          ...destructuredModules.resolvers.Query,
          ...currentModule.queries
        },
        Mutation: {
          ...destructuredModules.resolvers.Mutation,
          ...currentModule.mutations
        },
        Subscription: {
          ...destructuredModules.resolvers.Subscription,
          ...currentModule.subscriptions
        },
        ...currentModule.fieldResolvers
      };

      if (currentModule.middlewares) {
        destructuredModules.middlewares = {
          ...destructuredModules.middlewares,
          Query: {
            ...destructuredModules.middlewares.Query,
            ...currentModule.middlewares.queries
          },
          Mutation: {
            ...destructuredModules.middlewares.Mutation,
            ...currentModule.middlewares.mutations
          },
          Subscription: {
            ...destructuredModules.middlewares.Subscription,
            ...currentModule.middlewares.subscriptions
          },
          ...currentModule.middlewares.fieldMiddlewares
        };
      }
      return destructuredModules;
    },
    { schemas: [], resolvers: rootObject, middlewares: rootObject }
  );
};

const destructuredModules = destructureModules();

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

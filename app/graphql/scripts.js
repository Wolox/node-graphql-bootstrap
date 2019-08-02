const fs = require('fs'),
  path = require('path');

exports.generateIndex = dirent =>
  fs.readdirSync(path.join(__dirname, dirent.name)).reduce(
    (singleModule, file) => {
      const fileName = file.replace(/.js/gi, '');
      const definitions = require(path.join(__dirname, dirent.name, fileName));
      singleModule[fileName] = definitions[fileName] ? definitions[fileName] : definitions;
      if (definitions.schema) {
        singleModule.schemas.push(definitions.schema);
      }
      return singleModule;
    },
    { schemas: [] }
  );

exports.destructureModules = modules => {
  const rootObject = { Query: {}, Mutation: {}, Subscription: {} };
  return modules.reduce(
    (destructuredModules, currentModule) => {
      destructuredModules.schemas.push(...currentModule.schemas);

      const { fieldResolvers } = currentModule.resolvers ? currentModule.resolvers : {};
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
        ...fieldResolvers
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

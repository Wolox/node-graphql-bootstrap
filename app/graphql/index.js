const { makeExecutableSchema } = require('graphql-tools'),
  { applyMiddleware } = require('graphql-middleware'),
  fs = require('fs'),
  path = require('path');

const importEverything = () =>
  fs.readdirSync(__dirname, { withFileTypes: true }).reduce(
    (imports, dirent) => {
      if (dirent.isDirectory()) {
        const index = fs.readdirSync(path.join(__dirname, dirent.name)).reduce(
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
        imports.modules.push(index);
        return imports;
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

const destructuredModules = destructureModules();
console.log(destructuredModules);

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

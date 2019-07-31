const { makeExecutableSchema } = require('graphql-tools'),
  { applyMiddleware } = require('graphql-middleware'),
  fs = require('fs'),
  path = require('path');

const importEverything = () => {
  const imports = { modules: [] };
  fs.readdirSync(__dirname, { withFileTypes: true }).forEach(dirent => {
    if (dirent.isDirectory()) {
      imports.modules.push({ [dirent.name]: require(path.join(__dirname, dirent.name)) });
    } else if (dirent.name === 'index.js') {
      return;
    }
    imports[dirent.name.replace(/.js/gi, '')] = require(path.join(__dirname, dirent.name));
  });
  return imports;
};

const { types, inputs, enums: Enums, modules } = importEverything();

const getSchemas = () =>
  modules.reduce((schemas, currentModule) => {
    const moduleName = Object.keys(currentModule);
    schemas.push(...currentModule[moduleName].schemas);
    return schemas;
  }, []);

const getResolvers = resolverType =>
  modules.reduce((resolvers, currentModule) => {
    const moduleName = Object.keys(currentModule);
    const elements = currentModule[moduleName];
    return { ...resolvers, ...elements[resolverType] };
  }, {});

const getMiddlewares = middlewareType =>
  modules.reduce((middlewares, currentModule) => {
    const moduleName = Object.keys(currentModule);
    const elements = currentModule[moduleName].middlewares;
    return elements ? { ...middlewares, ...elements[middlewareType] } : { ...middlewares };
  }, {});

const schema = makeExecutableSchema({
  typeDefs: [types, inputs, ...getSchemas()],
  resolvers: {
    Query: {
      ...getResolvers('queries')
    },
    Mutation: {
      ...getResolvers('mutations')
    },
    Subscription: {
      ...getResolvers('subscriptions')
    },
    ...Enums,
    ...getResolvers('fieldResolvers')
  }
});

module.exports = applyMiddleware(schema, {
  Query: { ...getMiddlewares('queries') },
  Mutation: { ...getMiddlewares('mutations') },
  Subscription: { ...getMiddlewares('subscriptions') },
  ...getMiddlewares('fieldMiddlewares')
});

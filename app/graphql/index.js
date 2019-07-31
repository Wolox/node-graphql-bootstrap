const { makeExecutableSchema } = require('graphql-tools'),
  fs = require('fs'),
  path = require('path');

const importEverything = () => {
  const imports = { folders: [] };
  fs.readdirSync(__dirname, { withFileTypes: true }).forEach(dirent => {
    if (dirent.isDirectory()) {
      imports.folders.push({ [dirent.name]: require(path.join(__dirname, dirent.name)) });
    } else if (dirent.name === 'index.js') {
      return;
    }
    imports[dirent.name.replace(/.js/gi, '')] = require(path.join(__dirname, dirent.name));
  });
  return imports;
};

const { types, inputs, enums: Enums, folders: kinArray } = importEverything();

const getSchemas = () =>
  kinArray.reduce((schemas, currentKin) => {
    const kinName = Object.keys(currentKin);
    schemas.push(...currentKin[kinName].schemas);
    return schemas;
  }, []);

const getResolvers = resolverType =>
  kinArray.reduce((resolvers, currentKin) => {
    const kinName = Object.keys(currentKin);
    const elements = currentKin[kinName];
    return { ...resolvers, ...elements[resolverType] };
  }, {});

module.exports = makeExecutableSchema({
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
    ...Enums
  }
});

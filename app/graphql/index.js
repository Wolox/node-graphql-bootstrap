const { makeExecutableSchema } = require('graphql-tools'),
  { applyMiddleware } = require('graphql-middleware'),
  fs = require('fs'),
  path = require('path'),
  { generateIndex, destructureModules } = require('./scripts');

const INDEX_FILE = 'index.js',
  SCRIPTS_FILE = 'scripts.js';

const importEverything = () =>
  fs.readdirSync(__dirname, { withFileTypes: true }).reduce(
    (imports, dirent) => {
      if (dirent.isDirectory()) {
        const index = generateIndex(dirent);
        imports.modules.push(index);
        return imports;
      } else if (dirent.name === INDEX_FILE || dirent.name === SCRIPTS_FILE) {
        return imports;
      }
      imports[dirent.name.replace(/.js/gi, '')] = require(path.join(__dirname, dirent.name));
      return imports;
    },
    { modules: [] }
  );

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

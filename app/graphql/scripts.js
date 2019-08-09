const fs = require('fs'),
  path = require('path'),
  merge = require('lodash.merge');

exports.importEverything = () =>
  fs.readdirSync(__dirname, { withFileTypes: true }).reduce(
    (imports, dirent) => {
      if (dirent.isDirectory()) {
        fs.readdirSync(path.join(__dirname, dirent.name)).forEach(file => {
          const fileName = file.replace(/.js/gi, '');
          if (fileName === 'schemas') {
            const { schemas } = require(path.join(__dirname, dirent.name, fileName));
            imports.schemas.push(...schemas);
          }
          if (fileName === 'resolvers') {
            const resolvers = require(path.join(__dirname, dirent.name, fileName));
            merge(imports.resolvers, resolvers);
          }
          if (fileName === 'middlewares') {
            const middlewares = require(path.join(__dirname, dirent.name, fileName));
            merge(imports.middlewares, middlewares);
          }
        });
        return imports;
      }
      return imports;
    },
    { schemas: [], resolvers: {}, middlewares: {} }
  );

const { queries, schema: queriesSchema } = require('./queries'),
  { mutations, schema: mutationSchema } = require('./mutations');

module.exports = {
  queries,
  mutations,
  schemas: [queriesSchema, mutationSchema]
};

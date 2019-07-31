const { queries, schema: queriesSchema } = require('./queries'),
  { mutations, schema: mutationSchema } = require('./mutations'),
  { subscriptions, schema: subscriptionsSchema } = require('./subscriptions'),
  { fieldResolvers } = require('./resolvers'),
  middlewares = require('./middlewares');

module.exports = {
  queries,
  mutations,
  subscriptions,
  fieldResolvers,
  middlewares,
  schemas: [queriesSchema, mutationSchema, subscriptionsSchema]
};

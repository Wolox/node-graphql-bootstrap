const { queries, schema: queriesSchema } = require('./queries'),
  { mutations, schema: mutationSchema } = require('./mutations'),
  { subscriptions, schema: subscriptionsSchema } = require('./subscriptions');

module.exports = {
  queries,
  mutations,
  subscriptions,
  schemas: [queriesSchema, mutationSchema, subscriptionsSchema]
};

const { queries } = require('../utils');

module.exports = {
  queries: {
    healthCheck: () => process.uptime()
  },
  schemas: [
    queries`
        healthCheck: String!
    `
  ]
};

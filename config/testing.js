exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },
    redisCache: {
      name: process.env.REDIS_NAME_TEST
    },

    session: {
      secret: 'some-super-secret'
    }
  }
};

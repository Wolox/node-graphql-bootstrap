exports.config = {
  environment: 'production',
  common: {
    database: {
      name: process.env.DB_NAME
    },
    redisCache: {
      name: process.env.REDIS_NAME
    }
  },
  isProduction: true
};

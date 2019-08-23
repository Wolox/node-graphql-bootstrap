const { RedisCache } = require('apollo-server-cache-redis');
const { createHash } = require('crypto');

const config = require('../../config').common.redisCache;

const cache = new RedisCache({
  host: config.host,
  port: config.port,
  db: config.name
});

const createCacheKey = stringKey => {
  const hashedKey = createHash('sha256')
    .update(stringKey)
    .digest('hex');
  return hashedKey;
};

exports.findInCache = stringKey => {
  const key = createCacheKey(stringKey);
  return cache.get(key).then(cachedInfo => cachedInfo && JSON.parse(cachedInfo));
};

exports.updateCache = (stringKey, value, ttl = config.timeToLive) => {
  const key = createCacheKey(stringKey);
  const stringValue = JSON.stringify(value);
  return ttl ? cache.set(key, stringValue, { ttl }) : cache.set(key, stringValue);
};

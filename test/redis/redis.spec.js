const { RedisCache } = require('apollo-server-cache-redis');

const config = require('../../config').common.redisCache;

const cache = new RedisCache({
  host: config.host,
  db: config.name,
  maxRetriesPerRequest: 2,
  reconnectOnError: err => {
    const targetError = 'READONLY';
    if (err.message.slice(0, targetError.length) === targetError) {
      // Only reconnect when the error starts with "READONLY"
      return true;
    }
    return false;
  }
});
describe('redis', () => {
  test.only('connection', () =>
    cache
      .set('keyTest', 'TEST')
      .then(
        cache
          .get('keyTest')
          .then(value => expect(value).toEqual('TEST'))
          .catch(error => {
            console.log(error);
            return expect(typeof error).toEqual(undefined);
          })
      )
      .catch(error => {
        console.log(error);
        return expect(typeof error).toEqual(undefined);
      }));
});

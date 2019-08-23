const chance = require('chance')();

const createFakeAlbum = () => ({
  id: String(chance.integer({ min: 0, max: 9999 })),
  title: chance.sentence()
});

exports.createManyFakeAlbums = number => {
  const response = [];
  for (let i = 0; i < number; i++) {
    response.push(createFakeAlbum());
  }
  return Promise.resolve(response);
};

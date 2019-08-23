const chance = require('chance')();

const createFakePhoto = albumId => ({
  albumId: String(albumId),
  id: chance.integer({ min: 0, max: 9999 }),
  title: chance.sentence(),
  url: chance.url(),
  thumbnailUrl: chance.url()
});

exports.createManyFakePhotos = (number, albumId) => {
  const response = [];
  for (let i = 0; i < number; i++) {
    response.push(createFakePhoto(albumId));
  }
  return Promise.resolve(response);
};

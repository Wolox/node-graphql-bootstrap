const { getAlbum, getAllAlbums, getPhotosOfAlbum } = require('../../services/albums');

module.exports = {
  Query: {
    album: (_, params) => getAlbum(params.id),
    albums: (_, params) => getAllAlbums(params)
  },
  Album: {
    photos: obj => getPhotosOfAlbum(obj.id)
  }
};

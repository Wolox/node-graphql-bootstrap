const getAlbum = (root, { id }, { dataSources }) => dataSources.albumsApi.getAlbum(id);

const getPhotos = (root, args, { dataSources }) => {
  const { id: albumId } = root ? root : args;
  return dataSources.albumsApi.getPhotos({ albumId });
};

module.exports = {
  Query: {
    album: getAlbum
  },
  Album: {
    photos: getPhotos
  }
};

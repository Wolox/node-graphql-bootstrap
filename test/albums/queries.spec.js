const { query } = require('../server.spec'),
  { getAlbum, getAlbums, getAlbumsWithFilter, getAlbumsWithOffset } = require('./graphql'),
  albumFactory = require('../factories/album'),
  photoFactory = require('../factories/photo'),
  axios = require('axios');

describe('albums', () => {
  describe('queries', async () => {
    await it('should get album properly', () => {
      const fakeAlbumsProm = albumFactory.createManyFakeAlbums(5).then(fakeAlbumsToMock => {
        axios.setMockAlbums(fakeAlbumsToMock);
        return fakeAlbumsToMock;
      });
      const fakePhotosProm = photoFactory.createManyFakePhotos(5, 2).then(fakePhotosToMock => {
        axios.setMockPhotos(fakePhotosToMock);
        return fakePhotosToMock;
      });
      return Promise.all([fakeAlbumsProm, fakePhotosProm]).then(([fakeAlbums, fakePhotos]) =>
        query(getAlbum(fakeAlbums[0].id))
          .then(res => {
            console.log(JSON.stringify(res));
            return expect(res.data).toEqual({
              album: {
                id: fakeAlbums[0].id,
                title: fakeAlbums[0].title,
                photos: fakePhotos
              }
            });
          })
          .then(() =>
            query(getAlbum(fakeAlbums[1].id))
              .then(res =>
                expect(res.data).toEqual({
                  album: {
                    id: fakeAlbums[1].id,
                    title: fakeAlbums[1].title,
                    photos: fakePhotos
                  }
                })
              )
              .then(() =>
                query(getAlbum(fakeAlbums[2].id)).then(res =>
                  expect(res.data).toEqual({
                    album: {
                      id: fakeAlbums[2].id,
                      title: fakeAlbums[2].title,
                      photos: fakePhotos
                    }
                  })
                )
              )
          )
      );
    });
    await it('should get all albums properly', () => {
      const fakeAlbumsProm = albumFactory.createManyFakeAlbums(5).then(fakeAlbumsToMock => {
        axios.setMockAlbums(fakeAlbumsToMock);
        return fakeAlbumsToMock;
      });
      const fakePhotosProm = photoFactory.createManyFakePhotos(5, 3).then(fakePhotosToMock => {
        axios.setMockPhotos(fakePhotosToMock);
        return fakePhotosToMock;
      });
      return Promise.all([fakeAlbumsProm, fakePhotosProm]).then(([fakeAlbums, fakePhotos]) =>
        query(getAlbums())
          .then(res => expect(res.data.albums).toHaveLength(5))
          .then(() =>
            query(getAlbumsWithOffset(0, 3))
              .then(res => expect(res.data.albums).toHaveLength(3))
              .then(() =>
                query(getAlbumsWithFilter(fakeAlbums[2].title)).then(res => {
                  expect(res.data.albums).toHaveLength(1);
                  return expect(res.data.albums[0]).toEqual({
                    id: fakeAlbums[2].id,
                    title: fakeAlbums[2].title,
                    photos: fakePhotos
                  });
                })
              )
          )
      );
    });
  });
});

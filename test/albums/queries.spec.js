const { query } = require('../server.spec'),
  { getAlbum, getAlbums, getAlbumsWithFilter, getAlbumsWithOffset } = require('./graphql'),
  albumFactory = require('../factories/album'),
  photoFactory = require('../factories/photo'),
  axios = require('axios');

describe('albums', () => {
  describe('queries', () => {
    it('should get album properly', () => {
      const fakeAlbumsProm = albumFactory.createManyFakeAlbums(5).then(fakeAlbumsToMock => {
        axios.setMockAlbums(fakeAlbumsToMock);
        return fakeAlbumsToMock;
      });
      const fakePhotosProm = photoFactory.createManyFakePhotos(5, 1).then(fakePhotosToMock => {
        axios.setMockPhotos(fakePhotosToMock);
        return fakePhotosToMock;
      });
      return Promise.all([fakeAlbumsProm, fakePhotosProm]).then(([fakeAlbums, fakePhotos]) =>
        query(getAlbum(fakeAlbums[0].id))
          .then(res =>
            expect(res.data).toEqual({
              album: {
                id: fakeAlbums[0].id,
                title: fakeAlbums[0].title,
                photos: fakePhotos
              }
            })
          )
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
    it('should get all albums properly', () => {
      const fakeAlbumsProm = albumFactory.createManyFakeAlbums(5).then(fakeAlbumsToMock => {
        axios.setMockAlbums(fakeAlbumsToMock);
        return fakeAlbumsToMock;
      });
      const fakePhotosProm = photoFactory.createManyFakePhotos(5, 1).then(fakePhotosToMock => {
        axios.setMockPhotos(fakePhotosToMock);
        return fakePhotosToMock;
      });
      return Promise.all([fakeAlbumsProm, fakePhotosProm]).then(([fakeAlbums, fakePhotos]) => {
        query(getAlbums()).then(res => expect(res.data.albums).toHaveLength(5));
        query(getAlbumsWithOffset(0, 3)).then(res => expect(res.data.albums).toHaveLength(3));
        query(getAlbumsWithFilter(fakeAlbums[2].title)).then(res => {
          expect(res.data.albums).toHaveLength(1);
          expect(res.data.albums[0]).toEqual({
            id: fakeAlbums[2].id,
            title: fakeAlbums[2].title,
            photos: fakePhotos
          });
        });
      });
    });
  });
});
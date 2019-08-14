const { RESTDataSource } = require('apollo-datasource-rest');
const albumsApiConfig = require('../../config').common.albumsApi;

class AlbumsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = albumsApiConfig.endpoint;
  }

  getAlbum(id) {
    return this.get(`albums/${id}`);
  }

  getPhotos(params) {
    return this.get('photos', params);
  }
}

module.exports = {
  AlbumsApi
};

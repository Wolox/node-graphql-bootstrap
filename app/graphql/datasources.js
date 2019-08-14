const { RESTDataSource } = require('apollo-datasource-rest');

module.exports = class AlbumApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com/';
  }

  getAlbum(id) {
    return this.get(`albums/${id}`);
  }

  getPhotos(params) {
    return this.get('photos', params);
  }
};

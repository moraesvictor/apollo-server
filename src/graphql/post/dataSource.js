import { RESTDataSource } from '@apollo/datasource-rest';
import { makeDataLoader } from '../utils/dataloader.js';

/**
 * Classe que extende o a classe RESTdataSource do Apollo
 * para realizar os métodos HTTP de uma API Rest e fazer o CRUD de posts de usuários
 */
export class PostDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.API_URL}/posts/`;
    this.dataLoader = makeDataLoader(this.getPosts.bind(this), 'posts');
  }

  async getPosts(urlParams = {}) {
    return this.get('', {
      params: urlParams,
      cacheOptions: { ttl: 60 },
    });
  }

  async getPost(id) {
    return this.get(id, {
      cacheOptions: { ttl: 60 },
    });
  }
}

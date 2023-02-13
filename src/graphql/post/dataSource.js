import { RESTDataSource } from '@apollo/datasource-rest';

/**
 * Classe que extende o a classe RESTdataSource do Apollo
 * para realizar os métodos HTTP de uma API Rest e fazer o CRUD de posts de usuários
 */
export class PostDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.API_URL}/posts/`;
  }

  async getPosts(urlParams = {}) {
    return this.get('', urlParams);
  }

  async getPost(id) {
    return this.get(id);
  }
}

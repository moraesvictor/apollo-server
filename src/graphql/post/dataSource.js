import { RESTDataSource } from '@apollo/datasource-rest';

export class PostDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.API_URL}/posts/`;
  }

  async getPosts(urlParams = {}) {
    return this.get('', urlParams);
  }

  async getPost(id) {
    console.log(id);
    return this.get(`?id=${id}`);
  }
}
